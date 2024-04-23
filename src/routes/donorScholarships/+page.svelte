<script>
    export let data;
    const scholarships = data.scholarships;
    const archived = data.archived_scholarships;
    let viewArchived = false;
</script>

<section>
    <h1>View My Scholarships</h1>
    <a href="/createScholarship">
        <button class="createNew">Create New Scholarship</button>
    </a>
    <div>
        <h3>View Archived Scholarships</h3>
        <input
            type="checkbox"
            on:click={() => (viewArchived = !viewArchived)} />
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
                <a href="/donorScholarships/applicants-{scholarship.id}">
                    <button>View Applicants</button>
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

    .createNew {
        padding: 10px 20px;
        margin: 5px;
    }

    .big-box {
        display: none;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        margin-top: 10px;
    }
</style>
