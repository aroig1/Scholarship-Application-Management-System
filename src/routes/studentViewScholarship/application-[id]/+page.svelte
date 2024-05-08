<script>
    export let data;
    const scholarship = data.scholarship;
</script>

<section>
    <div class="title">
        <h1>{scholarship.name}</h1>
        <h1>Student Application</h1>
    </div>
    <form method="POST" class="container">
        <div>
            <h2>Personal Statement</h2>
            <h3>
                Enter your personal statement / essay for the scholarship donor.
            </h3>
            <input
                name="statement"
                class="statement"
                type="text"
                placeholder="Personal Statement"
                maxlength="10000" />
        </div>
        <div class="button">
            <button>Submit Application</button>
        </div>
        <div class="button">
            <a href="/studentViewScholarship/scholarship-{scholarship.id}">
                <button>Cancel</button>
            </a>
        </div>
    </form>
</section>

<style>
    section {
        /* Styling for MultiSelect */
        --sms-options-max-height: 200px;
    }

    .container {
        border: 1px solid #ccc;
        padding: 35px;
        margin: 0 20%;
        background-color: white;
        border-radius: 50px;
    }

    .title {
        margin: 25px 0;
    }

    h1 {
        width: 100%;
        text-align: center;
        font-size: 40px;
    }
    h2 {
        margin: 10px 0;
    }
    h3 {
        padding: 0;
        margin: 20px 0;
    }
    div {
        padding: 0;
        margin: 20px;
    }
    .statement {
        width: 100%;
        height: 100px;
    }
    .button {
        display: flex;
        justify-content: center;
        text-decoration: none;
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
