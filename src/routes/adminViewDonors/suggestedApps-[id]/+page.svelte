<script>
    export let data;
    const applicants = data.applicants;
</script>

<section>
    <h1>Suggested Applications</h1>
    <div class="header">
        <h3 class="status">Status</h3>
        <h3 class="name">Name</h3>
        <h3 class="gpa">GPA</h3>
        <h3 class="year">Year</h3>
    </div>
    {#if applicants.length == 0}
        <h2 class="empty">
            This scholarship currently has no suggested applicants
        </h2>
    {/if}
    {#each applicants as applicant}
        <div class="container">
            {#if applicant.status == "suggested"}
                <div class="status">
                    <span class="yellow"></span>
                    <h3>Suggested</h3>
                </div>
            {/if}
            <h2 class="name">{applicant.firstName} {applicant.lastName}</h2>
            <h3 class="gpa">{applicant.GPA}</h3>
            <h3 class="year">{applicant.year}</h3>
            <a
                href="/adminViewDonors/suggestedApp-{applicant.user}-{applicant.scholarship}"
                class="review">
                <button>Review Applicant</button>
            </a>
        </div>
    {/each}
</section>

<style>
    h1 {
        font-size: 40px;
        margin: 50px;
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
        position: absolute;
        left: 10%;
    }

    .yellow {
        height: 15px;
        width: 15px;
        margin-right: 10px;
        background-color: yellow;
        border-radius: 50%;
        display: inline-block;
    }

    .name {
        position: absolute;
        left: 25%;
    }

    .gpa {
        position: absolute;
        left: 50%;
    }

    .year {
        position: absolute;
        left: 65%;
    }

    .review {
        position: absolute;
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
