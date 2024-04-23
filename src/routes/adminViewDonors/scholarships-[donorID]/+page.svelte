<script>
    export let data;
    const scholarships = data.scholarships;
    const archived = data.archived;
    let viewArchived = false;
</script>

<section>
    <h1>{data.donor.firstName} {data.donor.lastName}'s Scholarships</h1>

    <div>
        <h2>View Archived Scholarships</h2>
        <input type="checkbox" bind:value={viewArchived}>
    </div>

    {#if viewArchived}
    {#each archived as scholarship}
        <div class="container">
            <div>
                <h3>This scholarship is Archived</h3>
                <h3>Name: {scholarship.name}</h3>
                <h3>Total Amount: ${scholarship.amount}</h3>
                <a href="/donorScholarships/modify-{scholarship.id}">
                    <button>Modify Scholarship</button>
                </a>
            </div>
            <div class="big-box" id="description-box"></div>
        </div>
    {/each}
    {/if}

    {#each scholarships as scholarship}
        <div class="container">
            <div>
                <h3>Name: {scholarship.name}</h3>
                <h3>Total Amount: ${scholarship.amount}</h3>
                <a href="/donorScholarships/modify-{scholarship.id}">
                    <button>Modify Scholarship</button>
                </a>
                <a href="/adminViewDonors/suggestedApps-{scholarship.id}">
                    <button>View Suggested Applicants</button>
                </a>
                <a href="/adminViewDonors/allApps-{scholarship.id}">
                    <button>View All Applicants</button>
                </a>
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

    button {
        margin-top: 10px;
    }

    .big-box {
        display: none;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        margin-top: 10px;
    }
</style>
