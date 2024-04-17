<script>
    export let data;
    const donors = data.donors;
</script>

<section>
    <h1>Scholarship Donors</h1>
    {#each donors as donor}
        <div class="container">
            <div>
                <h3>Name: {donor.firstName} {donor.lastName}</h3>
                <h3>Phone Number: {donor.phone}</h3>
                <h3>Email: {donor.email} </h3>
                <a href="/donorScholarships/modify-{donor.id}">
                    <button>View their Scholarships</button>
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
