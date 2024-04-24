<script>
    import {onMount} from "svelte";
    import {read, utils, writeFileXLSX} from "xlsx";

    /** @type {Array<{
     *   name: string
     *   amount: string
     *   donor_name: string
     *   donor_phone: string
     *   donor_email: string
     *   major: string
     *   minor: string
     *   cumalativeGPA: string
     *   deadline: string
     *   other: string
     * }>} */
    let active = [];
    /** @type {Array<{
     *   name: string
     *   amount: string
     *   donor_name: string
     *   donor_phone: string
     *   donor_email: string
     *   major: string
     *   minor: string
     *   cumalativeGPA: string
     *   deadline: string
     *   other: string
     * }>} */
    let archived = [];

    onMount(async () => {
        const fetch_active = await (
            await fetch("/api/reports/ScholarshipAvailable")
        ).text();
        const wb_active = read(fetch_active);
        const ws_active = wb_active.Sheets[wb_active.SheetNames[0]];
        active = utils.sheet_to_json(ws_active);

        const fetch_archived = await (
            await fetch("/api/reports/ScholarshipArchived")
        ).text();
        const wb_archived = read(fetch_archived);
        const ws_archived = wb_archived.Sheets[wb_archived.SheetNames[0]];
        archived = utils.sheet_to_json(ws_archived);
    });

    function exportFileActive() {
        const ws = utils.json_to_sheet(active);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "ActiveScholarshipReport.xlsx");
    }

    function exportFileArchived() {
        const ws = utils.json_to_sheet(archived);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "ArchivedScholarshipReport.xlsx");
    }
</script>

<section>
    <h1>Report Generation</h1>
    <div class="button-container">
        <button on:click={exportFileActive}>
            Active Scholarships Report
            <br />
            <span style="font-size: 0.8em;">(download)</span>
        </button>

        <button on:click={exportFileArchived}>
            Archived Scholarships Report
            <br />
            <span style="font-size: 0.8em;">(download)</span>
        </button>
    </div>
</section>

<main>
    <div class="table-container">
        <h2 class="report-title">Active Scholarships Preview</h2>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Scholarship Name</th>
                    <th>Amount</th>
                    <th>Donor</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Major</th>
                    <th>Minor</th>
                    <th>GPA</th>
                    <th>Deadline</th>
                    <th>Other</th>
                </tr>
            </thead>
            <tbody>
                {#each active as p}
                    <tr>
                        <td>{p.name}</td>
                        <td>{p.amount}</td>
                        <td>{p.donor_name}</td>
                        <td>{p.donor_phone}</td>
                        <td>{p.donor_email}</td>
                        <td>{p.major}</td>
                        <td>{p.minor}</td>
                        <td>{p.cumalativeGPA}</td>
                        <td>{p.deadline}</td>
                        <td>{p.other}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</main>

<main>
    <div class="table-container">
        <h2 class="report-title">Archived Scholarships Preview</h2>
        <table class="report-table">
            <thead>
                <tr>
                    <th>Scholarship Name</th>
                    <th>Amount</th>
                    <th>Donor</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Major</th>
                    <th>Minor</th>
                    <th>GPA</th>
                    <th>Deadline</th>
                    <th>Other</th>
                </tr>
            </thead>
            <tbody>
                {#each archived as p}
                    <tr>
                        <td>{p.name}</td>
                        <td>{p.amount}</td>
                        <td>{p.donor_name}</td>
                        <td>{p.donor_phone}</td>
                        <td>{p.donor_email}</td>
                        <td>{p.major}</td>
                        <td>{p.minor}</td>
                        <td>{p.cumalativeGPA}</td>
                        <td>{p.deadline}</td>
                        <td>{p.other}</td>
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
