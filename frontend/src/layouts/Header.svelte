<script>
  import Button from "../assets/Button.svelte";
  import logo from "../../../public/img/company_logo.png"
</script>

<header>
  <nav>
    <a class="logo" href="/">
      <img src="{logo}" alt="logo" />
    </a>
    <ul>
      <li><a href="/">About</a></li>
      <li><a href="/">Insight</a></li>
      <li><a href="/">Contact</a></li>
      <li><Button externalLink={"/"} buttonName={"Login"} /></li>
    </ul>
  </nav>
</header>

<style>
  .logo {
    @apply w-36 bg-transparent p-0;
  }
  /* h1 {
    @apply text-xl font-medium tracking-wide;
  } */

  header {
    @apply shadow-lg shadow-gray-200;
  }

  nav {
    @apply flex justify-between items-center px-28 py-4 bg-gray-800;
  }
</style>
