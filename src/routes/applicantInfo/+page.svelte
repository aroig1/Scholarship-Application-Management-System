<script>
    import {MultiSelect} from "svelte-multiselect";

    /** @type {import('./$types').PageData} */
    export let data;

    /** @type {import('$lib/types').Major[]} */
    let majorsSelected = [];
    /** @type {import('$lib/types').Minor[]} */
    let minorsSelected = [];

    let workExperience = [""];

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
    <h1>Student Application</h1>
    <form method="POST">
        <div>
            <h3>Preferred Pronouns</h3>
            <select name="pronouns">
                {#each Pronouns as pronoun}
                    <option>{pronoun}</option>
                {/each}
            </select>
        </div>
        <div>
            <h3>Net ID</h3>
            <input
                name="netID"
                type="text"
                placeholder="Net ID"
                maxlength="20" />
        </div>
        <div>
            <h3>Student ID</h3>
            <input
                name="studentID"
                type="text"
                placeholder="Student ID"
                maxlength="20" />
        </div>
        <div>
            <h3>Select Majors</h3>
            <MultiSelect
                name="majors"
                bind:value={majorsSelected}
                options={data.majors}
                placeholder="Select Majors"
                closeDropdownOnSelect={false}>
            </MultiSelect>
        </div>
        <div>
            <h3>Select Minors</h3>
            <MultiSelect
                name="minors"
                bind:value={minorsSelected}
                options={data.minors}
                placeholder="Select minors"
                closeDropdownOnSelect={false}>
            </MultiSelect>
        </div>
        <div>
            <h3>Cumulative GPA</h3>
            <input
                name="GPA"
                type="number"
                placeholder="3.0"
                step="0.01"
                min="0"
                max="4.0" />
        </div>
        <div>
            <h3>Current Year</h3>
            <select name="year">
                {#each data.years as year}
                    <option>{year}</option>
                {/each}
            </select>
        </div>
        <div>
            <h3>Ethnicity</h3>
            <select name="ethnicity">
                {#each data.ethnicities as e}
                    <option>{e}</option>
                {/each}
            </select>
        </div>
        <div>
            <h3>Work Experience</h3>
            {#each workExperience as w}
                <input
                    class="work_experience"
                    bind:value={w}
                    placeholder="Work Experience" />
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
        <button>Add to my profile</button>
    </form>
</section>

<style>
    section {
        margin: 0 auto;
        width: 90%;
        max-width: 700px;
        /* Styling for MultiSelect */
        --sms-options-max-height: 200px;
    }
    h1 {
        width: 100%;
        text-align: center;
    }
    h3 {
        padding: 0;
        margin: 0;
    }
    div {
        padding: 0;
        margin: 20px;
    }
    .work_experience {
        width: 100%;
        height: 60px;
        margin: 5px 0;
    }
    .hidden {
        visibility: hidden;
    }
</style>
