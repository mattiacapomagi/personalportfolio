<script>
  import { base } from "$app/paths";
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
  let analyticsData = $state(null);
  let isLoadingData = $state(false);
  let gaError = $state(null);

  // CONFIGURATION
  const CLIENT_ID =
    "927763286022-7hqkq16cgqterrgcv08eabcf5bg03bq1.apps.googleusercontent.com"; // Your new Client ID
  const PROPERTY_ID = "7843855770"; // From your screenshot

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
          fetchAnalyticsCallback();
        },
      });
    };
    document.body.appendChild(script);
  }

  function connectAnalytics() {
    if (tokenClient) {
      // Force prompt so you can select the right google account
      tokenClient.requestAccessToken({ prompt: "consent" });
    }
  }

  async function fetchAnalyticsCallback() {
    isLoadingData = true;
    gaError = null;

    try {
      // Define the report request
      const requestBody = {
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        metrics: [{ name: "activeUsers" }, { name: "sessions" }],
      };

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

      if (data.error) {
        throw new Error(data.error.message);
      }

      // Parse response
      if (data.rows && data.rows.length > 0) {
        analyticsData = {
          users: data.rows[0].metricValues[0].value,
          sessions: data.rows[0].metricValues[1].value,
        };
      } else {
        analyticsData = { users: 0, sessions: 0 };
      }
    } catch (e) {
      gaError = e.message;
    } finally {
      isLoadingData = false;
    }
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
    analyticsData = null;
  }
</script>

<svelte:head>
  <title>Control Room</title>
</svelte:head>

{#if checking}
  <!-- Blank screen while checking session -->
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

    <div class="grid">
      <!-- Analytics Widget -->
      <div class="card analytics-card">
        <h2>📊 Analytics (Last 30 Days)</h2>

        {#if !accessToken}
          <div class="auth-prompt">
            <p>Connect Google Account to view data.</p>
            <button class="connect-btn" onclick={connectAnalytics}>
              Sign in with Google
            </button>
          </div>
        {:else if isLoadingData}
          <div class="loading">Loading data...</div>
        {:else if gaError}
          <div class="error-msg">Error: {gaError}</div>
          <button class="retry-btn" onclick={fetchAnalyticsCallback}
            >Retry</button
          >
        {:else if analyticsData}
          <div class="stat-row">
            <span class="stat-label">Active Users</span>
            <span class="stat-value">{analyticsData.users}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Sessions</span>
            <span class="stat-value">{analyticsData.sessions}</span>
          </div>
        {:else}
          <div class="no-data">No data returned.</div>
        {/if}

        <div class="stat-row mt-4">
          <span class="stat-label">Property ID</span>
          <span class="stat-value mono">{PROPERTY_ID}</span>
        </div>
      </div>

      <!-- Status Widget -->
      <div class="card">
        <h2>⚡ Status</h2>
        <div class="stat-row">
          <span class="stat-label">Site</span>
          <span class="stat-value online">Online</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Env</span>
          <span class="stat-value mono">Production</span>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Login Overlay */
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
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 2rem;
    opacity: 0.7;
  }

  .login-card input {
    width: 100%;
    background: transparent;
    border: 1px solid var(--color-text);
    padding: 1rem;
    margin-bottom: 1rem;
    color: var(--color-text);
    font-family: inherit;
    font-size: 0.9rem;
    outline: none;
    border-radius: 0;
    transition: border-color 0.2s;
  }

  .login-card input:focus {
    border-color: var(--color-accent);
  }

  .login-card input.error {
    border-color: red;
    animation: shake 0.3s;
  }

  .login-card button {
    width: 100%;
    padding: 1rem;
    background: var(--color-text);
    color: var(--color-bg);
    border: none;
    font-family: inherit;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
  }

  .login-card button:hover {
    background: var(--color-accent);
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }

  /* Dashboard */
  .dashboard {
    padding: var(--page-padding);
    max-width: var(--max-width);
    margin: 0 auto;
    font-family: var(--font-mono);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
    border-bottom: 1px solid var(--color-text);
    padding-bottom: 1rem;
  }

  .header h1 {
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: 700;
  }

  .logout-btn {
    background: none;
    border: 1px solid var(--color-text);
    padding: 0.5rem 1rem;
    font-family: inherit;
    font-size: 0.8rem;
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.2s;
  }

  .logout-btn:hover {
    background: var(--color-text);
    color: var(--color-bg);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .card {
    border: 1px solid var(--color-text);
    padding: 1.5rem;
  }

  .card h2 {
    font-size: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px dashed var(--color-text-light);
    padding-bottom: 0.5rem;
  }

  /* Widget Styles */
  .stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px dotted rgba(128, 128, 128, 0.3);
  }

  .stat-row.mt-4 {
    margin-top: 1rem;
    border-top: 1px dotted rgba(128, 128, 128, 0.3);
  }

  .stat-row:last-of-type {
    border-bottom: none;
  }

  .stat-label {
    font-size: 0.8rem;
    opacity: 0.7;
  }

  .stat-value {
    font-size: 0.85rem;
    font-weight: 600;
  }

  .stat-value.mono {
    font-family: monospace;
    font-size: 0.75rem;
    opacity: 0.8;
  }

  .stat-value.online {
    color: #22c55e;
  }

  /* Auth UI */
  .auth-prompt {
    text-align: center;
    padding: 1rem 0;
  }

  .auth-prompt p {
    font-size: 0.8rem;
    margin-bottom: 1rem;
    opacity: 0.7;
  }

  .connect-btn {
    background: #4285f4;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.85rem;
    cursor: pointer;
    font-weight: 500;
  }

  .connect-btn:hover {
    background: #3367d6;
  }

  .error-msg {
    color: red;
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }

  .loading {
    font-size: 0.8rem;
    opacity: 0.6;
    text-align: center;
    padding: 1rem;
  }
</style>
