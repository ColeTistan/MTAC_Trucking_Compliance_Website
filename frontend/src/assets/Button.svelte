<script>
  export let buttonName, externalLink;
</script>

<a class="button" href={externalLink}>{buttonName}</a>

<style>
  .button {
    @apply transition-all duration-300 bg-amber-400 text-gray-800 rounded-full px-7 hover:bg-amber-500;
  }
</style>
