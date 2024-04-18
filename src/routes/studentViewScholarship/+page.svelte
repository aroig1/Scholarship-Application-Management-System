<script>
    export let data;
    const scholarships = data.scholarships;
</script>

<section>
    <h1>View Available Scholarships - Student POV</h1>
    {#each scholarships as scholarship}
        <div class="container">
            <div>
                <h3>Name: {scholarship.name}</h3>
                <h3>Total Amount: ${scholarship.amount}</h3>
                <a href="/studentViewScholarship/scholarship-{scholarship.id}">
                    <button>View Scholarship</button>
                </a>
            </div>
            <div class="big-box" id="description-box"></div>
        </div>
    {/each}
    <div class="button-container">
        <button>Available Scholarship Report</button>
        <button>Archived Scholarship Report</button>
    </div>
</section>

<style>
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
    .button-container {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-top: 40px;
        margin-bottom: 20px;
    }

    .button-container button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }
</style>
