<script>
    import {onMount} from "svelte";
    import {read, utils, writeFileXLSX} from "xlsx";

    export let data;
    const applicants = data.applicants;

    /** @type {Array<{
     *   name: string
     *   pronouns: string
     *   ID: string
     *   major: string
     *   minor: string
     *   cumalativeGPA: string
     *   current_Year: string
     *   Ethnicity: string
     *   personal_Statement: string
     *   work_Experience: string
     * }>} */
    let scholarshipApplicants = [];

    onMount(async () => {
        const fetch_applicants = await (
            await fetch(
                "/api/reports/ScholarshipApplicants/" + data.scholarship
            )
        ).text();
        const wb_applicants = read(fetch_applicants);
        const ws_applicants = wb_applicants.Sheets[wb_applicants.SheetNames[0]];
        scholarshipApplicants = utils.sheet_to_json(ws_applicants);
    });

    function exportFileApplication() {
        const ws = utils.json_to_sheet(scholarshipApplicants);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "applicantsScholarshipReport.xlsx");
    }
</script>

<section>
    <div class="header-container">
        <h1>Suggested Applications</h1>
        <button on:click={exportFileApplication}>
            Scholarship Applicants Report
            <br />
            <span style="font-size: 0.8em;">(download)</span>
        </button>
    </div>
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
                href="/adminViewDonors/applicant-{applicant.user}-{applicant.scholarship}"
                class="review">
                <button>Review Applicant</button>
            </a>
        </div>
    {/each}
</section>

<style>
    .header-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 40px;
    }

    .header-container h1 {
        margin-right: 20px; /* Adjust the margin as needed */
    }
    h1 {
        font-size: 40px;
        margin: 10px;
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
