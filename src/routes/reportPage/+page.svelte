<section>
    <h1>Report Generation</h1>
    <div class="button-container">
        <button>Awarded Scholarship Report</button>
        <button
            on:click={async () =>
                window.open(
                    "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
                        (await (
                            await fetch("/api/reports/studentDemographic")
                        ).text())
                )}>Student Demographic Report</button>
        <button
            on:click={async () =>
                window.open(
                    "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
                        (await (await fetch("/api/reports/activeDonor")).text())
                )}>Active Donor Report</button>
    </div>
</section>

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
</style>
