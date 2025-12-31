<script>
  let { data } = $props();
</script>

<div
  style="padding: 100px; background: white; color: black; min-height: 100vh;"
>
  <h1>DEBUG MODE: NUCLEAR RESET</h1>
  <p>If you can read this, the routing works.</p>
  <p>Project Slug: {data.project?.slug}</p>
  <p>Project Title: {data.project?.title}</p>
  <hr />
  <a href="/">BACK TO HOME</a>
</div>
