<script>
    export let data;
    const scholarships = data.scholarships;
    console.log(data);
</script>

<a href="/">Home</a>

<section>
    <h1>View Available Scholarships - Student POV</h1>
    {#each scholarships as scholarship}
        <div class="container">
            <div>
                <h3>Name: {scholarship.name}</h3>
                <h3>Total Amount: ${scholarship.amount}</h3>
                <a
                    href="/studentViewScholarship/scholarship-{scholarship.id}">
                    <button>View Scholarship</button>
                </a>
            </div>
            <div class="big-box" id="description-box"></div>
        </div>
    {/each}
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
</style>
