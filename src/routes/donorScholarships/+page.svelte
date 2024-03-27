<script>
    export let data;
    const scholarships = data.scholarships;
</script>

<section>
    <h1>View All Scholarships</h1>
    {#each scholarships as scholarship}
        <div class="container">
            <div>
                <div class="name-block">
                    <h3>Name: {scholarship.name}</h3>
                </div>
                <div class="amount-block">
                    <h3>Total Amount {scholarship.amount}:</h3>
                </div>
                <a href='/modifyScholarship/{scholarship.id}'>
                    <button>Modify Scholarship</button>
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

    .amount-block {
        margin-left: auto;
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
