<script>
  import { fade } from "svelte/transition";
</script>

<div class="loader-overlay" out:fade={{ duration: 300 }}>
  <div class="spinner"></div>
</div>

<style>
  .loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--color-bg);
    color: var(--color-text);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(128, 128, 128, 0.2);
    border-radius: 50%;
    border-top-color: var(--color-text);
    animation: spin 0.8s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
