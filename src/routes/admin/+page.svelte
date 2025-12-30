<script>
  import { onMount, onDestroy } from "svelte";

  /* --- Admin Auth Logic (Google Gate) --- */
  let checking = $state(true);
  let isUnlocked = $state(false);
  let unauthorized = $state(false);
  let currentUserEmail = $state("");

  const ALLOWED_EMAIL = "mattia.capomagi@gmail.com";

  /* --- Analytics Logic --- */
  let tokenClient;
  let accessToken = $state(null);
  let isLoadingData = $state(false);
  let gaError = $state(null);

  // Data States
  let overviewData = $state(null);
  let pagesData = $state([]);
  let deviceData = $state([]);
  let geoData = $state([]);
  let securityData = $state([]);
  let sourcesData = $state([]); // NEW
  let osData = $state([]); // NEW
  let engagementData = $state(null); // NEW

  let githubStatus = $state({ pages: "loading", actions: "loading" });
  let repoSize = $state("...");

  // Token Persistence
  const GA_TOKEN_KEY = "ga_access_token";
  const GA_TOKEN_TIMESTAMP = "ga_token_timestamp";
  const TOKEN_VALIDITY = 50 * 60 * 1000; // 50 mins

  // CONFIGURATION
  const CLIENT_ID =
    "927763286022-7hqkq16cgqterrgcv08eabcf5bg03bq1.apps.googleusercontent.com";
  const PROPERTY_ID = "436388629";

  onMount(() => {
    loadGoogleScripts();
  });

  function loadGoogleScripts() {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = () => {
      // 1. Initialize Token Client
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope:
          "https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/userinfo.email",
        callback: (response) => {
          if (response.error) {
            console.error(response.error);
            checking = false;
            return;
          }
          // Handle successful OAuth response
          handleAuthSuccess(response.access_token);
        },
      });

      // 2. Check for existing session
      checkStoredToken();
    };
    document.body.appendChild(script);
  }

  async function checkStoredToken() {
    const storedToken = localStorage.getItem(GA_TOKEN_KEY);
    const storedTime = localStorage.getItem(GA_TOKEN_TIMESTAMP);

    if (storedToken && storedTime) {
      const age = Date.now() - parseInt(storedTime);
      if (age < TOKEN_VALIDITY) {
        // Token exists and looks valid time-wise.
        // Validate it by fetching user profile (this acts as the Gate check)
        accessToken = storedToken;
        await verifyIdentity(storedToken);
      } else {
        // Expired
        clearSession();
        checking = false;
      }
    } else {
      checking = false;
    }
  }

  function loginWithGoogle() {
    tokenClient.requestAccessToken({ prompt: "consent" });
  }

  function handleAuthSuccess(token) {
    accessToken = token;
    localStorage.setItem(GA_TOKEN_KEY, token);
    localStorage.setItem(GA_TOKEN_TIMESTAMP, Date.now().toString());
    verifyIdentity(token);
  }

  /* --- The Google Gate --- */
  async function verifyIdentity(token) {
    checking = true;
    try {
      // Fetch User Profile
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Token invalid");

      const profile = await res.json();
      currentUserEmail = profile.email;

      // STRICT CHECK
      if (profile.email === ALLOWED_EMAIL) {
        isUnlocked = true;
        unauthorized = false;
        // Proceed to load data
        fetchAllAnalytics();
        fetchGithubStatus();
        fetchRepoSize();
      } else {
        // INTRUDER DETECTED
        isUnlocked = false;
        unauthorized = true;
        logSecurityEvent(); // Log the attempt!
        clearSession();
      }
    } catch (e) {
      console.error("Identity Check Failed", e);
      clearSession();
    } finally {
      checking = false;
    }
  }

  function clearSession() {
    localStorage.removeItem(GA_TOKEN_KEY);
    localStorage.removeItem(GA_TOKEN_TIMESTAMP);
    accessToken = null;
  }

  function logSecurityEvent() {
    if (typeof gtag !== "undefined") {
      gtag("event", "security_login_failed", {
        event_category: "security",
        event_label: "unauthorized_email",
        non_interaction: true,
      });
    }
  }

  /* --- Data Fetching --- */
  async function fetchGithubStatus() {
    try {
      const res = await fetch(
        "https://www.githubstatus.com/api/v2/summary.json"
      );
      const data = await res.json();
      const pages = data.components.find((c) => c.name === "Pages");
      const actions = data.components.find((c) => c.name === "Actions");
      githubStatus = {
        pages: pages ? pages.status : "unknown",
        actions: actions ? actions.status : "unknown",
      };
    } catch (e) {
      githubStatus = { pages: "error", actions: "error" };
    }
  }

  async function fetchRepoSize() {
    try {
      const res = await fetch(
        "https://api.github.com/repos/mattiacapomagi/personalportfolio"
      );
      const data = await res.json();
      if (data.size) {
        const mb = (data.size / 1024).toFixed(2);
        repoSize = `${mb} MB`;
      }
    } catch (e) {
      repoSize = "Unknown";
    }
  }

  async function fetchAllAnalytics() {
    isLoadingData = true;
    gaError = null;

    try {
      const [overview, pages, devices, geo, security, sources, engagement, os] =
        await Promise.all([
          runReport({
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            metrics: [{ name: "activeUsers" }, { name: "sessions" }],
          }),
          runReport({
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            dimensions: [{ name: "pagePath" }],
            metrics: [{ name: "screenPageViews" }],
            orderBys: [
              { desc: true, metric: { metricName: "screenPageViews" } },
            ],
            limit: 5,
          }),
          runReport({
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            dimensions: [{ name: "deviceCategory" }],
            metrics: [{ name: "activeUsers" }],
          }),
          runReport({
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            dimensions: [{ name: "country" }],
            metrics: [{ name: "activeUsers" }],
            orderBys: [{ desc: true, metric: { metricName: "activeUsers" } }],
            limit: 5,
          }),
          runReport({
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            dimensions: [{ name: "eventName" }, { name: "date" }],
            metrics: [{ name: "eventCount" }],
            dimensionFilter: {
              filter: {
                fieldName: "eventName",
                stringFilter: { value: "security_login_failed" },
              },
            },
            orderBys: [{ desc: true, dimension: { dimensionName: "date" } }],
          }),
          // NEW 1: Traffic Sources
          runReport({
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            dimensions: [{ name: "sessionSource" }],
            metrics: [{ name: "activeUsers" }],
            orderBys: [{ desc: true, metric: { metricName: "activeUsers" } }],
            limit: 5,
          }),
          // NEW 2: Engagement
          runReport({
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            metrics: [{ name: "averageSessionDuration" }],
          }),
          // NEW 3: OS
          runReport({
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            dimensions: [{ name: "operatingSystem" }],
            metrics: [{ name: "activeUsers" }],
            orderBys: [{ desc: true, metric: { metricName: "activeUsers" } }],
            limit: 5,
          }),
        ]);

      if (overview.rows && overview.rows.length > 0) {
        overviewData = {
          users: overview.rows[0].metricValues[0].value,
          sessions: overview.rows[0].metricValues[1].value,
        };
      }

      if (engagement.rows && engagement.rows.length > 0) {
        const seconds = parseInt(engagement.rows[0].metricValues[0].value);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        engagementData = `${mins}m ${secs}s`;
      }

      if (pages.rows) {
        pagesData = pages.rows.map((row) => ({
          path: row.dimensionValues[0].value,
          views: row.metricValues[0].value,
        }));
      }

      if (devices.rows) {
        const total = devices.rows.reduce(
          (acc, row) => acc + parseInt(row.metricValues[0].value),
          0
        );
        deviceData = devices.rows.map((row) => ({
          category: row.dimensionValues[0].value,
          count: row.metricValues[0].value,
          percent: Math.round(
            (parseInt(row.metricValues[0].value) / total) * 100
          ),
        }));
      }

      if (osData.rows || os.rows) {
        const rows = os.rows || [];
        const total = rows.reduce(
          (acc, row) => acc + parseInt(row.metricValues[0].value),
          0
        );
        osData = rows.map((row) => ({
          os: row.dimensionValues[0].value,
          percent: Math.round(
            (parseInt(row.metricValues[0].value) / total) * 100
          ),
        }));
      }

      if (geo.rows) {
        geoData = geo.rows.map((row) => ({
          country: row.dimensionValues[0].value,
          users: row.metricValues[0].value,
        }));
      }

      if (sources.rows) {
        sourcesData = sources.rows.map((row) => ({
          source: row.dimensionValues[0].value,
          users: row.metricValues[0].value,
        }));
      }

      if (security.rows) {
        securityData = security.rows.map((row) => ({
          date: row.dimensionValues[1].value,
          count: row.metricValues[0].value,
        }));
      }
    } catch (e) {
      console.error(e);
      gaError = e.message;
      if (e.message.includes("401") || e.message.includes("403")) {
        clearSession();
      }
    } finally {
      isLoadingData = false;
    }
  }

  async function runReport(requestBody) {
    const response = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data;
  }

  function logout() {
    clearSession();
    isUnlocked = false;
    accessToken = null;
    overviewData = null;
  }
</script>

<svelte:head>
  <title>Control Room</title>
</svelte:head>

{#if checking}
  <div class="login-overlay">
    <div class="login-card">
      <div class="spinner"></div>
      <p class="mt-4">Verifying Security Clearance...</p>
    </div>
  </div>
{:else if !isUnlocked}
  <!-- GOOGLE GATE OVERLAY -->
  <div class="login-overlay">
    <div class="login-card">
      <h1>SYSTEM LOCKED</h1>
      <p class="mb-4">Biometric/2FA Verification Required</p>

      {#if unauthorized}
        <div class="error-msg dev-error">
          ACCESS DENIED. <br />
          Email not authorized.
        </div>
      {/if}

      <button onclick={loginWithGoogle} class="google-btn">
        <svg viewBox="0 0 24 24" class="google-icon"
          ><path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          /><path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          /><path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          /><path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          /></svg
        >
        Authenticate with Google
      </button>
    </div>
  </div>
{:else}
  <!-- Dashboard Content -->
  <div class="dashboard">
    <div class="header">
      <div>
        <h1>Control Room</h1>
        <p class="user-badge">Logged as: {currentUserEmail}</p>
      </div>
      <button class="logout-btn" onclick={logout}>Logout</button>
    </div>

    <!-- Data Grid -->
    {#if isLoadingData}
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Decrypting Analytics Streams...</p>
      </div>
    {:else}
      <div class="grid">
        <!-- 1. Overview Widget -->
        <div class="card overview-card col-span-2">
          <h2>Overview (30d)</h2>
          {#if overviewData}
            <div class="big-stats">
              <div class="stat-item">
                <span class="label">Users</span>
                <span class="value">{overviewData.users}</span>
              </div>
              <div class="stat-item">
                <span class="label">Sessions</span>
                <span class="value">{overviewData.sessions}</span>
              </div>
              <div class="stat-item">
                <span class="label">Avg Time</span>
                <span class="value">{engagementData || "--"}</span>
              </div>
            </div>
          {:else}
            <p class="no-data">No overview data available.</p>
          {/if}
        </div>

        <!-- 2. Devices Widget -->
        <div class="card">
          <h2>Devices</h2>
          {#if deviceData.length > 0}
            <div class="list-container">
              {#each deviceData as device}
                <div class="list-row">
                  <span class="row-name">{device.category}</span>
                  <div class="row-bar-container">
                    <div class="row-bar" style="width: {device.percent}%"></div>
                  </div>
                  <span class="row-stat">{device.percent}%</span>
                </div>
              {/each}
            </div>
          {:else}
            <p class="no-data">No device data.</p>
          {/if}
        </div>

        <!-- 2b. OS Widget -->
        <div class="card">
          <h2>Tech (OS)</h2>
          {#if osData.length > 0}
            <div class="list-container">
              {#each osData as item}
                <div class="list-row">
                  <span class="row-name">{item.os}</span>
                  <div class="row-bar-container">
                    <div class="row-bar" style="width: {item.percent}%"></div>
                  </div>
                  <span class="row-stat">{item.percent}%</span>
                </div>
              {/each}
            </div>
          {:else}
            <p class="no-data">No OS data.</p>
          {/if}
        </div>

        <!-- 3. Top Pages Widget -->
        <div class="card col-span-2">
          <h2>Top Content</h2>
          {#if pagesData.length > 0}
            <table class="data-table">
              <thead>
                <tr>
                  <th>Path</th>
                  <th>Views</th>
                </tr>
              </thead>
              <tbody>
                {#each pagesData as page}
                  <tr>
                    <td class="page-path">{page.path}</td>
                    <td class="mono">{page.views}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          {:else}
            <p class="no-data">No page data received.</p>
          {/if}
        </div>

        <!-- 4. Geography Widget -->
        <div class="card">
          <h2>Audience</h2>
          {#if geoData.length > 0}
            <div class="list-container">
              {#each geoData as item}
                <div class="list-row">
                  <span class="row-name">{item.country}</span>
                  <span class="row-stat">{item.users}</span>
                </div>
              {/each}
            </div>
          {:else}
            <p class="no-data">No geo data.</p>
          {/if}
        </div>

        <!-- 4b. Traffic Sources -->
        <div class="card">
          <h2>Traffic Source</h2>
          {#if sourcesData.length > 0}
            <div class="list-container">
              {#each sourcesData as item}
                <div class="list-row">
                  <span class="row-name">{item.source}</span>
                  <span class="row-stat">{item.users}</span>
                </div>
              {/each}
            </div>
          {:else}
            <p class="no-data">No source data.</p>
          {/if}
        </div>

        <!-- 5. Security Log Widget -->
        <div class="card col-span-2">
          <h2>Security Log</h2>
          {#if securityData.length > 0}
            <table class="data-table">
              <thead><tr><th>Date</th><th>Failed Attempts</th></tr></thead>
              <tbody>
                {#each securityData as event}
                  <tr>
                    <td class="mono">{event.date}</td>
                    <td style="color: red; font-weight: bold;">{event.count}</td
                    >
                  </tr>
                {/each}
              </tbody>
            </table>
          {:else}
            <div class="secure-state">
              <span class="icon">SECURE</span>
              <p>No recent intrusions detected.</p>
            </div>
          {/if}
        </div>

        <!-- 6. System Status -->
        <div class="card col-span-2">
          <h2>System</h2>
          <div class="list-row">
            <span class="row-name">GH Pages</span>
            <span class="row-stat status-{githubStatus.pages}"
              >{githubStatus.pages}</span
            >
          </div>
          <div class="list-row">
            <span class="row-name">GH Actions</span>
            <span class="row-stat status-{githubStatus.actions}"
              >{githubStatus.actions}</span
            >
          </div>
          <div class="list-row">
            <span class="row-name">Storage</span>
            <span class="row-stat mono">{repoSize}</span>
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  /* Global Layout */
  .dashboard {
    padding: var(--page-padding);
    max-width: 1200px;
    margin: 0 auto;
    font-family: var(--font-mono);
  }

  .bad-badge {
      background: rgba(239, 68, 68, 0.2);
      color: #f87171;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.7em;
      font-weight: bold;
  }
  
  .error-badge {
      background: rgba(234, 179, 8, 0.2);
      color: #facc15;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.7em;
      font-weight: bold;
  }
  
  .ok-badge {
      background: rgba(34, 197, 94, 0.2);
      color: #4ade80;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.7em;
      font-weight: bold;
  }
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--color-text);
    padding-bottom: 1rem;
  }

  .header h1 {
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  .user-badge {
    font-size: 0.8rem;
    opacity: 0.6;
    margin-top: 0.2rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr; /* Mobile first */
    gap: 1.5rem;
  }

  /* Bento Grid for Desktop (4 columns) */
  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: minmax(180px, auto);
    }

    .col-span-2 {
      grid-column: span 2;
    }

    .row-span-2 {
      grid-row: span 2;
    }
  }

  /* Wide card spans 2 columns on larger screens */
  @media (min-width: 900px) and (max-width: 1023px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .col-span-2 {
      grid-column: span 2;
    }
  }

  /* Card Styles */
  .card {
    border: 1px solid var(--color-text);
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02); /* Glassy hint */
  }

  .card h2 {
    font-size: 0.9rem;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    opacity: 0.7;
    border-bottom: 1px dashed var(--color-text-light);
    padding-bottom: 0.5rem;
  }

  /* Overview Stats */
  .big-stats {
    display: flex;
    justify-content: space-around;
    text-align: center;
  }
  .stat-item {
    display: flex;
    flex-direction: column;
  }
  .stat-item .label {
    font-size: 0.8rem;
    opacity: 0.6;
  }
  .stat-item .value {
    font-size: 2rem;
    font-weight: 700;
  }

  /* List / Bar Charts */
  .list-container {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  .list-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
  }
  .row-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 1rem;
  }
  .row-bar-container {
    flex: 1;
    height: 6px;
    background: rgba(128, 128, 128, 0.2);
    border-radius: 3px;
    margin-right: 1rem;
    max-width: 100px;
  }
  .row-bar {
    height: 100%;
    background: var(--color-accent);
    border-radius: 3px;
  }
  .row-stat {
    font-weight: 600;
    font-family: monospace;
  }

  /* Status Colors */
  .status-operational {
    color: #22c55e;
    text-transform: capitalize;
  }
  .status-degraded {
    color: #eab308;
    text-transform: capitalize;
  }
  .status-major {
    color: #ef4444;
    text-transform: capitalize;
  }
  .status-loading {
    opacity: 0.5;
    font-style: italic;
  }

  /* Data Table */
  .data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
  }
  .data-table th {
    text-align: left;
    opacity: 0.5;
    padding-bottom: 0.5rem;
    font-weight: normal;
  }
  .data-table td {
    padding: 0.5rem 0;
    border-top: 1px dotted rgba(128, 128, 128, 0.2);
  }
  .page-path {
    font-family: monospace;
    color: var(--color-accent);
  }

  .secure-state {
    text-align: center;
    padding: 1rem;
    opacity: 0.7;
    color: #22c55e;
  }
  .secure-state .icon {
    font-size: 1.5rem;
    display: block;
    margin-bottom: 0.5rem;
  }

  /* Auth & Loading */
  .loading-state {
    text-align: center;
    padding: 4rem;
    opacity: 0.6;
  }
  .dev-error {
    color: red;
    margin-top: 1rem;
    font-size: 0.9rem;
    font-weight: bold;
    border: 1px solid red;
    padding: 1rem;
  }
  .no-data {
    text-align: center;
    opacity: 0.5;
    font-style: italic;
    font-size: 0.8rem;
    padding: 1rem;
  }

  /* Reuse existing Login Styles */
  .login-overlay {
    position: fixed;
    inset: 0;
    background: var(--color-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    font-family: var(--font-mono);
  }
  .login-card {
    width: 100%;
    max-width: 320px;
    padding: 2rem;
    border: 1px solid var(--color-text);
    text-align: center;
  }
  .login-card h1 {
    font-size: 1rem;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
  .mb-4 {
    margin-bottom: 2rem;
    opacity: 0.7;
    font-size: 0.85rem;
  }
  .mt-4 {
    margin-top: 2rem;
    opacity: 0.7;
    font-size: 0.85rem;
  }

  .google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: white;
    color: #333;
    border: none;
    padding: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    border-radius: 4px;
    gap: 10px;
  }
  .google-icon {
    width: 18px;
    height: 18px;
  }

  .logout-btn {
    background: none;
    border: 1px solid var(--color-text);
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: inherit;
  }

  .spinner {
    margin: 0 auto;
    width: 40px;
    height: 40px;
    border: 3px solid rgba(128, 128, 128, 0.3);
    border-radius: 50%;
    border-top-color: var(--color-accent);
    animation: spin 1s ease-in-out infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
