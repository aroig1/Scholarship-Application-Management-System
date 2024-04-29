<script>
    export let data;
    const applications = data.applications;
</script>

<section>
    <h1>My Applications</h1>
    {#each applications as application}
        <div class="container">
            <div>
                <h2>Scholarship {application.name}</h2>
                {#if application.status == "suggested"}
                    <h3>Application Status: In Review</h3>
                {:else}
                    <h3>Application Status: {application.status}</h3>
                {/if}
            </div>
            <div class="big-box" id="description-box"></div>
        </div>
    {/each}
</section>

<style>
    .container {
        display: block;
        flex-wrap: nowrap;
        border: 1px solid #ccc;
        padding: 10px;
    }

    .big-box {
        display: none;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        margin-top: 10px;
    }
</style>
