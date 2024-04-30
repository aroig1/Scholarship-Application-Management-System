<script>
    export let data;
    const scholarships = data.scholarships;
</script>

<section>
    <div class="page_title">
        <h1>Available Scholarships</h1>
        <a href="/ReportEngine/ScholarshipReportsPage">
            <button>Available/Archived Scholarship Reports</button>
        </a>
    </div>
    <div class="header">
        <h3 class="name">Scholarship Name</h3>
        <h3 class="amount">Total Amount</h3>
    </div>
    {#each scholarships as scholarship}
        <div class="container">
            <h3 class="name">{scholarship.name}</h3>
            <h3 class="amount">${scholarship.amount}</h3>
            <a
                class="view"
                href="/studentViewScholarship/scholarship-{scholarship.id}">
                <button>View Scholarship</button>
            </a>
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

    .header {
        display: flex;
        align-items: center;
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

    .view {
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
</style>
