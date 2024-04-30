<script>
    import {MultiSelect} from "svelte-multiselect";

    /** @type {import('./$types').PageData} */
    export let data;

    /** @type {import('$lib/types').Major[]} */
    let majorsSelected = [];
    /** @type {import('$lib/types').Minor[]} */
    let minorsSelected = [];
</script>

<section>
    <h1>Create New Scholarship</h1>
    <form method="POST" class="container">
        <div>
            <h3>Enter scholarship name</h3>
            <input
                name="name"
                type="text"
                placeholder="super special scholarship"
                maxlength="100" />
        </div>
        <div>
            <h3>Enter scholarship amount</h3>
            <input
                name="amount"
                type="number"
                step="0.01"
                placeholder="1000"
                min="0" />
        </div>
        <div>
            <h3>Enter scholarship donor/sponsor full name</h3>
            <input
                name="firstName"
                type="text"
                placeholder="first name"
                maxlength="15" />
            <input
                name="lastName"
                type="text"
                placeholder="last name"
                maxlength="15" />
        </div>
        <div>
            <h3>Enter donor phone number</h3>
            <input
                name="phoneNumber"
                type="text"
                placeholder="(999) 999-9999"
                maxlength="20" />
        </div>
        <div>
            <h3>Enter donor email address</h3>
            <input
                name="email"
                type="email"
                placeholder="netID@arizona.edu"
                maxlength="25" />
        </div>
        <div>
            <h3>Enter number of scholarships available</h3>
            <input name="numAvailable" type="number" placeholder="3" min="0" />
        </div>
        <div>
            <h3>Enter required majors (optional)</h3>
            <MultiSelect
                name="requiredMajors"
                bind:value={majorsSelected}
                options={data.majors}
                placeholder="Pick required majors"
                closeDropdownOnSelect={false}>
            </MultiSelect>
        </div>
        <div>
            <h3>Enter required minor (optional)</h3>
            <MultiSelect
                name="requiredMinors"
                bind:value={minorsSelected}
                options={data.minors}
                placeholder="Pick required minors"
                closeDropdownOnSelect={false}>
            </MultiSelect>
        </div>
        <div>
            <h3>Enter minimum required GPA (optional)</h3>
            <input
                name="requiredGPA"
                type="number"
                step="0.01"
                placeholder="3.0"
                min="0" />
        </div>
        <div>
            <h3>Enter application deadline</h3>
            <input name="deadline" type="date" />
        </div>
        <div>
            <h3>Enter any additional scholarship requirements (optional)</h3>
            <textarea
                name="other"
                class="other"
                placeholder="ex: Must be interested in IoT"></textarea>
        </div>
        <div>
            <h3>Enter scholarship description and/or essay prompt.</h3>
            <textarea name="description" class="other"></textarea>
        </div>
        <div class="button">
            <button>Create Scholarship</button>
        </div>
    </form>
</section>

<style>
    section {
        /* Styling for MultiSelect */
        --sms-options-max-height: 200px;
    }
    h1 {
        text-align: center;
        font-size: 40px;
        margin: 25px;
    }
    .container {
        border: 1px solid #ccc;
        padding: 35px;
        margin: 0 20%;
        background-color: white;
        border-radius: 50px;
    }
    h3 {
        margin: 5px 0;
    }
    input {
        height: 20px;
    }
    div {
        padding: 0;
        margin: 20px;
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
    textarea {
        width: 100%;
        height: 100px;
    }
</style>
