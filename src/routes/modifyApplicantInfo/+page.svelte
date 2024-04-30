<script>
    import {MultiSelect} from "svelte-multiselect";

    /** @type {import('./$types').PageData} */
    export let data;

    let applicantInfo = data.applicantInfo;

    /** @type {import('$lib/types').Major[]} */
    let majorsSelected = applicantInfo.majors;
    /** @type {import('$lib/types').Minor[]} */
    let minorsSelected = applicantInfo.minors;

    let workExperience = applicantInfo.workExperience;

    const addField = () => {
        workExperience = [...workExperience, ""];
    };

    const removeField = () => {
        workExperience = workExperience.slice(0, workExperience.length - 1);
    };

    let Pronouns = [
        "He/Him",
        "She/Her",
        "They/Them",
        "Ze/Zir/Hir",
        "Xe/Xem/Xyrs"
    ];
</script>

<section>
    <h1>Applicant Information</h1>
    <form method="POST" class="container">
        <div>
            <h3>Preferred Pronouns</h3>
            <select name="pronouns" value={applicantInfo.preferredPronouns}>
                {#each Pronouns as pronoun}
                    <option>{pronoun}</option>
                {/each}
            </select>
        </div>
        <div>
            <h3>Net ID</h3>
            <input
                name="netID"
                value={applicantInfo.netID}
                type="text"
                placeholder="Net ID"
                maxlength="20" />
        </div>
        <div>
            <h3>Student ID</h3>
            <input
                name="studentID"
                value={applicantInfo.studentID}
                type="text"
                placeholder="Student ID"
                maxlength="20" />
        </div>
        <div>
            <h3>Select Majors</h3>
            <MultiSelect
                name="majors"
                bind:selected={majorsSelected}
                options={data.majors}
                placeholder="Select Majors"
                closeDropdownOnSelect={false}>
            </MultiSelect>
        </div>
        <div>
            <h3>Select Minors</h3>
            <MultiSelect
                name="minors"
                bind:selected={minorsSelected}
                options={data.minors}
                placeholder="Select minors"
                closeDropdownOnSelect={false}>
            </MultiSelect>
        </div>
        <div>
            <h3>Cumulative GPA</h3>
            <input
                name="GPA"
                value={applicantInfo.GPA}
                type="number"
                placeholder="3.0"
                step="0.01"
                min="0"
                max="4.0" />
        </div>
        <div>
            <h3>Current Year</h3>
            <select name="year" value={applicantInfo.year}>
                {#each data.years as year}
                    <option>{year}</option>
                {/each}
            </select>
        </div>
        <div>
            <h3>Ethnicity</h3>
            <select name="ethnicity" value={applicantInfo.ethnicity}>
                {#each data.ethnicities as e}
                    <option>{e}</option>
                {/each}
            </select>
        </div>
        <div>
            <h3>Work Experience</h3>
            {#each workExperience as w}
                <textarea
                    class="work_experience"
                    bind:value={w}
                    placeholder="Work Experience"></textarea>
            {/each}
            <button on:click|preventDefault={addField}>Add</button>
            {#if workExperience.length >= 2}
                <button on:click|preventDefault={removeField}>Remove</button>
            {/if}

            <input
                class="hidden"
                name="workExperience"
                value={workExperience} />
        </div>
        <div class="button">
            <button class="save">Save</button>
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
        padding: 35px 50px;
        margin: 25px 20%;
        background-color: white;
        border-radius: 50px;
    }

    h1 {
        width: 100%;
        text-align: center;
        font-size: 40px;
        margin-top: 30px;
    }
    h3 {
        padding: 0;
        margin: 0;
    }
    div {
        padding: 0;
        margin: 20px;
    }
    input {
        height: 20px;
    }
    .work_experience {
        width: 100%;
        height: 80px;
        margin: 5px 0;
    }
    .button {
        display: flex;
        justify-content: center;
        text-decoration: none;
    }
    button {
        padding: 5px 15px;
        border-radius: 20px;
        border-style: none;
        background-color: rgb(13, 35, 75);
        color: white;
    }
    .save {
        margin-top: 10px;
        padding: 15px 30px;
        border-radius: 25px;
        border-style: none;
        background-color: rgb(13, 35, 75);
        color: white;
    }
    button:hover {
        background-color: rgb(55, 141, 189);
        cursor: pointer;
    }
    .hidden {
        visibility: hidden;
    }
</style>
