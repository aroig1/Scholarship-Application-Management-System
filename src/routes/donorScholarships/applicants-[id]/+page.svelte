<script>
    export let data;
    const applicants = data.applicants;
</script>

<section>
    <h1>Applications</h1>
    <div class="header">
        <h3 class="status">Status</h3>
        <h3 class="name">Name</h3>
        <h3 class="gpa">GPA</h3>
        <h3 class="year">Year</h3>
    </div>
    {#if applicants.length == 0}
        <h2 class="empty">This scholarship currently has no applicants</h2>
    {/if}
    {#each applicants as applicant}
        <div class="container">
            {#if applicant.status == "suggested"}
                <div class="status">
                    <span class="yellow"></span>
                    <h3>Suggested</h3>
                </div>
            {:else if applicant.status == "applied"}
                <div class="status">
                    <span class="blue"></span>
                    <h3>Applied</h3>
                </div>
            {:else if applicant.status == "awarded"}
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
            <h2 class="name">{applicant.firstName} {applicant.lastName}</h2>
            <h3 class="gpa">{applicant.GPA}</h3>
            <h3 class="year">{applicant.year}</h3>
            <a
                class="review"
                href="/donorScholarships/applicant-{applicant.user}-{applicant.scholarship}">
                <button>Review Applicant</button>
            </a>
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

    .status {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 10%;
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

    .name {
        position: fixed;
        left: 25%;
    }

    .gpa {
        position: fixed;
        left: 50%;
    }

    .year {
        position: fixed;
        left: 65%;
    }

    .review {
        position: fixed;
        right: 15%;
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
