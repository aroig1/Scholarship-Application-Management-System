<script>
    import {page} from "$app/stores";
</script>

<h1>Error: {$page.status}</h1>
{#if $page.error?.message != "Error: " + $page.status}
    <h2>{$page.error?.message}</h2>
{/if}
<!-- svelte-ignore a11y-invalid-attribute -->
<a href="javascript:history.back()">Go Back</a>
