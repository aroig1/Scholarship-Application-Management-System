<script>
    export let data;
    const applications = data.applications;
</script>

<section>
    <h1>My Applications</h1>
    <div class="header">
        <h3 class="name">Scholarship Name</h3>
        <h3 class="status">Application Status</h3>
    </div>
    {#if applications.length == 0}
        <h2 class="empty">
            Looks like you haven't submitted any applications yet.
        </h2>
    {/if}
    {#each applications as application}
        <div class="container">
            <h2 class="name">{application.name}</h2>
            {#if application.status == "suggested"}
                <div class="status">
                    <span class="yellow"></span>
                    <h3>In Review</h3>
                </div>
            {:else if application.status == "applied"}
                <div class="status">
                    <span class="blue"></span>
                    <h3>Application Submitted</h3>
                </div>
            {:else if application.status == "awarded"}
                <div class="status">
                    <span class="green"></span>
                    <h3>Awarded</h3>
                </div>
            {:else}
                <div class="status">
                    <span class="red"></span>
                    <h3>Rejected</h3>
                </div>
            {/if}
        </div>
    {/each}
</section>

<style>
    h1 {
        text-align: center;
        font-size: 40px;
        margin-top: 25px;
        margin-bottom: 40px;
    }
    .empty {
        text-align: center;
        margin: 50px;
    }
    .header {
        display: flex;
        align-items: center;
    }
    .container {
        display: flex;
        border: 1px solid #ccc;
        padding: 50px 0;
        align-items: center;
        margin: 25px 10%;
        background-color: white;
    }

    .name {
        position: fixed;
        left: 15%;
    }

    .status {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 65%;
    }

    .blue {
        height: 15px;
        width: 15px;
        margin-right: 10px;
        background-color: blue;
        border-radius: 50%;
        display: inline-block;
    }

    .yellow {
        height: 15px;
        width: 15px;
        margin-right: 10px;
        background-color: yellow;
        border-radius: 50%;
        display: inline-block;
    }

    .green {
        height: 15px;
        width: 15px;
        margin-right: 10px;
        background-color: green;
        border-radius: 50%;
        display: inline-block;
    }

    .red {
        height: 15px;
        width: 15px;
        margin-right: 10px;
        background-color: red;
        border-radius: 50%;
        display: inline-block;
    }
</style>
