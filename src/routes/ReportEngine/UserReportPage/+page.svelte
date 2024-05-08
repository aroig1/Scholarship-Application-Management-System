<script>
    // import { Scholarship } from './../../../lib/types.ts';
    import {onMount} from "svelte";
    import {read, utils, writeFileXLSX} from "xlsx";

    /** @type {Array<{
     *   Name: string,
     *   PhoneNumber: string,
     *   Email: string,
     *   ScholarshipName: string,
     *   ScholarshipAmount: string,
     *   AmountAvailable: string,
     *   RequiredMajor: string,
     *   RequiredMinor: string,
     *   RequiredGPA: string,
     *   Deadline: string
     * }>} */
    let donors = [];

    /** @type {Array<{
     *   name: string,
     *   preferredPronouns: string,
     *   StudentID: string,
     *   Major: string,
     *   Minor: string,
     *   CumulativeGPA: string,
     *   CurrentYear: string,
     *   Ethnicity: string,
     *   WorkExperience: string
     * }>} */
    let students = [];

    /** @type {Array<{
     *   ScholarshipName: string,
     *   Amount: string,
     *   name: string,
     *   email: string,
     *   NetID: string,
     *   Major: string,
     *   CumulativeGPA: string,
     *   Ethnicity: string,
     * }>} */
    let awards = [];

    onMount(async () => {
        const fetch_donors = await (
            await fetch("/api/reports/activeDonor")
        ).text();
        const wb_donors = read(fetch_donors);
        const ws_donors = wb_donors.Sheets[wb_donors.SheetNames[0]];
        donors = utils.sheet_to_json(ws_donors);

        const fetch_students = await (
            await fetch("/api/reports/studentDemographic")
        ).text();
        const wb_students = read(fetch_students);
        const ws_students = wb_students.Sheets[wb_students.SheetNames[0]];
        students = utils.sheet_to_json(ws_students);

        const fetch_awards = await (
            await fetch("/api/reports/ScholarshipAwardReprot")
        ).text();
        const wb_awards = read(fetch_awards);
        const ws_awards = wb_awards.Sheets[wb_awards.SheetNames[0]];
        awards = utils.sheet_to_json(ws_awards);
    });

    function exportFileDonors() {
        const ws = utils.json_to_sheet(donors);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "ActiveDonorReport.xlsx");
    }

    function exportFileStudents() {
        const ws = utils.json_to_sheet(students);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "StudentDemographicReport.xlsx");
    }

    function exportFileAwards() {
        const ws = utils.json_to_sheet(awards);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "AwardedStudentReport.xlsx");
    }
</script>

<section>
    <h1>Report Generation</h1>
    <div class="button-container">
        <button on:click={exportFileStudents}>
            Student Demographic Report
            <br />
            <span style="font-size: 0.8em;">(download)</span>
        </button>

        <button on:click={exportFileDonors}>
            Active Donor Report
            <br />
            <span style="font-size: 0.8em;">(download)</span>
        </button>

        <button on:click={exportFileAwards}>
            Awarded Scholarship Report
            <br />
            <span style="font-size: 0.8em;">(download)</span>
        </button>
    </div>
</section>

<main>
    <div class="table-container">
        <h2 class="report-title">Active Donor Report Preview</h2>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Scholarship</th>
                    <th>Amount</th>
                    <th>Available</th>
                    <th>Major</th>
                    <th>Minor</th>
                    <th>GPA</th>
                    <th>Deadline</th>
                </tr>
            </thead>
            <tbody>
                {#each donors as p}
                    <tr>
                        <td>{p.Name}</td>
                        <td>{p.PhoneNumber}</td>
                        <td>{p.Email}</td>
                        <td>{p.ScholarshipName}</td>
                        <td>{p.ScholarshipAmount}</td>
                        <td>{p.AmountAvailable}</td>
                        <td>{p.RequiredMajor}</td>
                        <td>{p.RequiredMinor}</td>
                        <td>{p.RequiredGPA}</td>
                        <td>{p.Deadline}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</main>

<main>
    <div class="table-container">
        <h2 class="report-title">Awarded Scholarship Report</h2>
        <table class="report-table">
            <thead>
                <tr>
                    <th>ScholarshipName</th>
                    <th>Amount</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>NetID</th>
                    <th>Major</th>
                    <th>GPA</th>
                    <th>Ethnicity</th>
                </tr>
            </thead>
            <tbody>
                {#each awards as p}
                    <tr>
                        <td>{p.ScholarshipName}</td>
                        <td>{p.Amount}</td>
                        <td>{p.name}</td>
                        <td>{p.email}</td>
                        <td>{p.NetID}</td>
                        <td>{p.Major}</td>
                        <td>{p.CumulativeGPA}</td>
                        <td>{p.Ethnicity}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</main>

<main>
    <div class="table-container">
        <h2 class="report-title">Student Demographic Report</h2>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Pronouns</th>
                    <th>StudentID</th>
                    <th>Major</th>
                    <th>Minor</th>
                    <th>GPA</th>
                    <th>Year</th>
                    <th>Ethnicity</th>
                    <th>Work Experience</th>
                </tr>
            </thead>
            <tbody>
                {#each students as p}
                    <tr>
                        <td>{p.name}</td>
                        <td>{p.preferredPronouns}</td>
                        <td>{p.StudentID}</td>
                        <td>{p.Major}</td>
                        <td>{p.Minor}</td>
                        <td>{p.CumulativeGPA}</td>
                        <td>{p.CurrentYear}</td>
                        <td>{p.Ethnicity}</td>
                        <td>{p.WorkExperience}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</main>

<style>
    .button-container {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-top: 40px;
    }

    button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }

    .table-container {
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        max-height: 300px; /* Adjust the maximum height as needed */
        overflow-y: auto;
    }

    .report-title {
        font-size: 24px;
        text-align: center;
        margin-bottom: 20px;
        padding: 10px 0;
        background-color: #f2f2f2;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .report-table {
        width: 100%;
        border-collapse: collapse;
    }

    .report-table th,
    .report-table td {
        border: 1px solid #000;
        padding: 8px;
        text-align: left;
    }

    .report-table th {
        background-color: #f2f2f2;
    }
</style>
