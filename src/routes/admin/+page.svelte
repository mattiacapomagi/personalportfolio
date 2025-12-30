<script>
  import { onMount } from "svelte";

  /* --- Admin Auth Logic --- */
  let checking = $state(true);
  let isUnlocked = $state(false);
  let passwordInput = $state("");
  let unlockError = $state(false);

  const ADMIN_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || "capomagico";
  const SESSION_KEY = "admin_session_timestamp";
  const SESSION_TIMEOUT = 30 * 60 * 1000;

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

  // CONFIGURATION
  const CLIENT_ID =
    "927763286022-7hqkq16cgqterrgcv08eabcf5bg03bq1.apps.googleusercontent.com";
  const PROPERTY_ID = "436388629";

  onMount(() => {
    checkSession();
    loadGoogleScripts();
  });

  function checkSession() {
    if (typeof window === "undefined") return;
    const timestamp = localStorage.getItem(SESSION_KEY);
    if (timestamp && Date.now() - parseInt(timestamp) < SESSION_TIMEOUT) {
      isUnlocked = true;
    }
    checking = false;
  }

  function loadGoogleScripts() {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = () => {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: "https://www.googleapis.com/auth/analytics.readonly",
        callback: (response) => {
          if (response.error) {
            gaError = response.error;
            return;
          }
          accessToken = response.access_token;
          fetchAllAnalytics();
        },
      });
    };
    document.body.appendChild(script);
  }

  function connectAnalytics() {
    if (tokenClient) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    }
  }

  async function fetchAllAnalytics() {
    isLoadingData = true;
    gaError = null;

    try {
      const [overview, pages, devices, geo] = await Promise.all([
        runReport({
          dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
          metrics: [{ name: "activeUsers" }, { name: "sessions" }],
        }),
        runReport({
          dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
          dimensions: [{ name: "pagePath" }],
          metrics: [{ name: "screenPageViews" }],
          orderBys: [{ desc: true, metric: { metricName: "screenPageViews" } }],
          limit: 5,
        }),
        runReport({
          dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
          dimensions: [{ name: "deviceCategory" }],
          metrics: [{ name: "sessions" }],
        }),
        runReport({
          dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
          dimensions: [{ name: "country" }],
          metrics: [{ name: "activeUsers" }],
          orderBys: [{ desc: true, metric: { metricName: "activeUsers" } }],
          limit: 5,
        }),
      ]);

      // Process Overview
      if (overview.rows && overview.rows.length > 0) {
        overviewData = {
          users: overview.rows[0].metricValues[0].value,
          sessions: overview.rows[0].metricValues[1].value,
        };
      }

      // Process Pages
      if (pages.rows) {
        pagesData = pages.rows.map((row) => ({
          path: row.dimensionValues[0].value,
          views: row.metricValues[0].value,
        }));
      }

      // Process Devices
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

      // Process Geo
      if (geo.rows) {
        geoData = geo.rows.map((row) => ({
          country: row.dimensionValues[0].value,
          users: row.metricValues[0].value,
        }));
      }
    } catch (e) {
      console.error(e);
      gaError = e.message;
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

  function checkPassword() {
    if (passwordInput === ADMIN_PASSWORD) {
      isUnlocked = true;
      localStorage.setItem(SESSION_KEY, Date.now().toString());
    } else {
      unlockError = true;
      passwordInput = "";
      setTimeout(() => (unlockError = false), 1000);
    }
  }

  function handleKeydown(e) {
    if (e.key === "Enter") checkPassword();
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    isUnlocked = false;
    accessToken = null;
    overviewData = null;
    pagesData = [];
    deviceData = [];
    geoData = [];
  }
</script>

<svelte:head>
  <title>Control Room</title>
</svelte:head>

{#if checking}
  <!-- Blank screen while checking -->
{:else if !isUnlocked}
  <!-- Login Overlay -->
  <div class="login-overlay">
    <div class="login-card">
      <h1>System Access</h1>
      <input
        type="password"
        placeholder="Unlock Key"
        bind:value={passwordInput}
        onkeydown={handleKeydown}
        class:error={unlockError}
      />
      <button onclick={checkPassword}>Initialize</button>
    </div>
  </div>
{:else}
  <!-- Dashboard Content -->
  <div class="dashboard">
    <div class="header">
      <h1>Control Room</h1>
      <button class="logout-btn" onclick={logout}>Logout</button>
    </div>

    <!-- Auth Prompt (if not connected) -->
    {#if !accessToken}
      <div class="card auth-card">
        <h2>📊 Connect Analytics</h2>
        <p>Sign in to view real-time data from Google Analytics.</p>
        <button class="connect-btn" onclick={connectAnalytics}>
          Sign in with Google
        </button>
        {#if gaError}
          <div class="error-msg dev-error">Error: {gaError}</div>
        {/if}
      </div>
    {:else if isLoadingData}
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Fetching satellite data...</p>
      </div>
    {:else}
      <div class="grid">
        <!-- 1. Overview Widget -->
        <div class="card overview-card">
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

        <!-- 3. Top Pages Widget -->
        <div class="card wide-card">
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

        <!-- 5. System Status -->
        <div class="card">
          <h2>System</h2>
          <div class="list-row">
            <span class="row-name">Environment</span>
            <span class="row-stat online">Production</span>
          </div>
          <div class="list-row">
            <span class="row-name">Property ID</span>
            <span class="row-stat mono">{PROPERTY_ID}</span>
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

  .header {
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

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  /* Wide card spans 2 columns on larger screens */
  @media (min-width: 900px) {
    .wide-card {
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
  .row-stat.online {
    color: #22c55e;
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

  /* Auth & Loading */
  .auth-card {
    text-align: center;
    max-width: 400px;
    margin: 4rem auto;
  }
  .connect-btn {
    background: #4285f4;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1rem;
  }
  .connect-btn:hover {
    background: #3367d6;
  }
  .loading-state {
    text-align: center;
    padding: 4rem;
    opacity: 0.6;
  }
  .dev-error {
    color: red;
    margin-top: 1rem;
    font-size: 0.8rem;
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
  }
  .login-card {
    width: 100%;
    max-width: 320px;
    padding: 2rem;
    border: 1px solid var(--color-text);
    text-align: center;
  }
  .login-card h1 {
    font-size: 0.9rem;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
  .login-card input {
    width: 100%;
    background: transparent;
    border: 1px solid var(--color-text);
    padding: 1rem;
    margin-bottom: 1rem;
    color: var(--color-text);
    font-family: inherit;
    outline: none;
  }
  .login-card input:focus {
    border-color: var(--color-accent);
  }
  .login-card button {
    width: 100%;
    padding: 1rem;
    background: var(--color-text);
    color: var(--color-bg);
    border: none;
    font-weight: bold;
    cursor: pointer;
  }
  .logout-btn {
    background: none;
    border: 1px solid var(--color-text);
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: inherit;
  }
</style>
