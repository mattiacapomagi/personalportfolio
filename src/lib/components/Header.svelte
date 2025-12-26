<script>
	import { page } from '$app/state';
	
	const navLinks = [
		{ href: '/', label: 'projects' },
		{ href: '/about', label: 'about' }
	];
	
	function isActive(href) {
		const pathname = page.url.pathname;
		if (href === '/') {
			return pathname === '/' || pathname.startsWith('/projects');
		}
		return pathname === href || pathname.startsWith(href);
	}
</script>

<header class="header">
	<a href="/" class="logo">MATTIA CAPOMAGI</a>
	<nav class="nav">
		{#each navLinks as link}
			<a 
				href={link.href} 
				class="nav-link"
				class:active={isActive(link.href)}
			>
				{link.label}
			</a>
		{/each}
	</nav>
</header>

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24px 40px;
		z-index: 100;
		background-color: var(--color-bg);
	}
	
	.logo {
		font-size: 14px;
		font-weight: 400;
		letter-spacing: 0.02em;
	}
	
	.nav {
		display: flex;
		gap: 32px;
	}
	
	.nav-link {
		font-size: 14px;
		font-weight: 400;
		letter-spacing: 0.02em;
		transition: color 0.2s ease;
	}
	
	.nav-link:hover,
	.nav-link.active {
		color: var(--color-accent);
	}
</style>
