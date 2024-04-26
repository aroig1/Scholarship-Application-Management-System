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

    {#each applicants as applicant}
        <div class="container">
            <div>
                <h3>(Application Status: {applicant.status})</h3>
                <h2>{applicant.firstName} {applicant.lastName}</h2>
                <h3>GPA: {applicant.GPA}</h3>
                <h3>Year: {applicant.year}</h3>
                <h3>Majors: {applicant.majors}</h3>
                <a
                    href="/adminViewDonors/applicant-{applicant.user}-{applicant.scholarship}">
                    <button>Review Applicant</button>
                </a>
            </div>
            <div class="big-box" id="description-box"></div>
        </div>
    {/each}
</section>

<style>
    .header-container {
        display: flex;
        align-items: center;
    }

    .header-container h1 {
        margin-right: 20px; /* Adjust the margin as needed */
    }
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
