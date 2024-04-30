<script>
    export let data;
    const scholarships = data.scholarships;
    const archived = data.archived;
    let viewArchived = false;
</script>

<section>
    <h1>{data.donor.firstName} {data.donor.lastName}'s Scholarships</h1>

    <div class="archived">
        <h3>View Archived Scholarships</h3>
        <input
            type="checkbox"
            class="checkbox"
            on:click={() => (viewArchived = !viewArchived)} />
    </div>
    <div class="header">
        <h3 class="name">Scholarship Name</h3>
        <h3 class="amount">Total Amount</h3>
    </div>

    {#if scholarships.length == 0 && archived.length == 0}
        <h2 class="empty">This donor currently has no scholarships</h2>
    {/if}

    {#if viewArchived}
        {#each archived as scholarship}
            <div class="container">
                <h3 class="name">{scholarship.name} (archived)</h3>
                <h3 class="amount">${scholarship.amount}</h3>
                <a
                    href="/donorScholarships/modify-{scholarship.id}"
                    class="buttons">
                    <button>Modify Scholarship</button>
                </a>
            </div>
        {/each}
    {/if}

    {#each scholarships as scholarship}
        <div class="container">
            <h3 class="name">{scholarship.name}</h3>
            <h3 class="amount">${scholarship.amount}</h3>
            <div class="buttons">
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
        </div>
    {/each}
</section>

<style>
    h1 {
        font-size: 40px;
        margin: 40px;
        text-align: center;
    }
    .empty {
        text-align: center;
        margin: 50px;
    }

    .archived {
        display: flex;
        margin: 25px 5%;
    }

    .header {
        display: flex;
        align-items: center;
    }

    .checkbox {
        margin-left: 10px;
    }

    .container {
        display: flex;
        border: 1px solid #ccc;
        padding: 50px 0;
        align-items: center;
        margin: 25px 5%;
        background-color: white;
    }

    .name {
        position: absolute;
        left: 10%;
    }

    .amount {
        position: absolute;
        left: 35%;
    }

    .buttons {
        position: absolute;
        right: 10%;
    }

    button {
        padding: 10px 25px;
        border-radius: 20px;
        border-style: none;
        background-color: rgb(13, 35, 75);
        color: white;
    }

    button:hover {
        background-color: rgb(55, 141, 189);
        cursor: pointer;
    }
</style>
