<script>
  /* --- Admin Auth Logic (same pattern as Maintenance Mode) --- */
  let checking = $state(true); // Prevents flash while checking session
  let isUnlocked = $state(false);
  let passwordInput = $state("");
  let unlockError = $state(false);

  // Use the same password as maintenance mode
  const ADMIN_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || "capomagico";
  const SESSION_KEY = "admin_session_timestamp";
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

  // Check session on mount
  $effect(() => {
    if (typeof window === "undefined") return;
    const timestamp = localStorage.getItem(SESSION_KEY);
    if (timestamp && Date.now() - parseInt(timestamp) < SESSION_TIMEOUT) {
      isUnlocked = true;
    }
    checking = false; // Done checking, show UI
  });

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
        <h2>📊 Analytics</h2>
        <div class="stat-row">
          <span class="stat-label">Property</span>
          <span class="stat-value">sito portfolio</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">ID</span>
          <span class="stat-value mono">G-FXENJE6FZ2</span>
        </div>
        <a
          href="https://analytics.google.com/analytics/web/#/p7843855770/reports/reportinghub"
          target="_blank"
          rel="noopener noreferrer"
          class="ga-link"
        >
          Open Google Analytics →
        </a>
      </div>

      <!-- Status Widget -->
      <div class="card">
        <h2>⚡ Status</h2>
        <div class="stat-row">
          <span class="stat-label">Site</span>
          <span class="stat-value online">Online</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Last Deploy</span>
          <span class="stat-value mono">—</span>
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

  .ga-link {
    display: block;
    margin-top: 1rem;
    padding: 0.75rem;
    background: var(--color-text);
    color: var(--color-bg);
    text-align: center;
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 600;
    transition: background 0.2s;
  }

  .ga-link:hover {
    background: var(--color-accent);
  }
</style>
