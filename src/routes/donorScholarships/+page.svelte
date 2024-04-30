<script>
    export let data;
    const scholarships = data.scholarships;
    const archived = data.archived_scholarships;
    let viewArchived = false;
</script>

<section>
    <div class="page_title">
        <h1>View My Scholarships</h1>
        <a href="/createScholarship">
            <button class="createNew">Create New Scholarship</button>
        </a>
    </div>
    <div class="archived">
        <h3>Include Archived Scholarships</h3>
        <input
            class="checkbox"
            type="checkbox"
            on:click={() => (viewArchived = !viewArchived)} />
    </div>
    <div class="header">
        <h3 class="name">Scholarship Name</h3>
        <h3 class="amount">Total Amount</h3>
    </div>

    {#if scholarships.length == 0 && archived.length == 0}
        <h2 class="empty">
            Looks like you haven't created any scholarships yet.
        </h2>
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
                <a href="/donorScholarships/applicants-{scholarship.id}">
                    <button>View Applicants</button>
                </a>
            </div>
        </div>
    {/each}
</section>

<style>
    .page_title {
        margin: 50px 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    h1 {
        font-size: 40px;
        margin-bottom: 10px;
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
        position: fixed;
        left: 10%;
    }

    .amount {
        position: fixed;
        left: 45%;
    }

    .buttons {
        position: fixed;
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

    .createNew {
        padding: 10px 20px;
        margin: 5px;
    }
</style>
