<script>
    // @ts-nocheck
    import FilterDialog from "$lib/components/FilterDialog.svelte";
    export let applicants;

    let search = "";
    let displayed;
    let showFilters = false;
    const defaults = {
        score: 1,
        gpa: {
            min: 0.0,
            max: 4.0
        }
    };
    let filters = structuredClone(defaults);
    const sort_options = ["Name A-Z", "GPA", "Matching Score"];
    let sort = "Matching Score";

    function apply_filters(applicants, search, filters, sort) {
        displayed = applicants;

        // Searching
        if (search != "") {
            // @ts-ignore
            displayed = displayed.filter((a) => {
                return (
                    a.firstName.toLowerCase().match(search.toLowerCase()) ||
                    a.lastName.toLowerCase().match(search.toLowerCase())
                );
            });
        }

        // Filtering
        displayed = displayed.filter((a) => {
            return (
                a.GPA >= filters.gpa.min &&
                a.GPA <= filters.gpa.max &&
                a.score >= filters.score
            );
        });

        // Sorting
        if (sort == sort_options[2]) {
            displayed.sort((a, b) => b.score - a.score);
        } else if (sort == sort_options[1]) {
            displayed.sort((a, b) => b.GPA - a.GPA);
        } else if (sort == sort_options[0]) {
            displayed.sort((a, b) =>
                a.firstName
                    .toLowerCase()
                    .localeCompare(b.firstName.toLowerCase())
            );
        }

        return displayed;
    }

    $: displayed = apply_filters(applicants, search, filters, sort);
</script>

<section>
    <div class="controls">
        <h3>
            Search: <input bind:value={search} class="search" type="text" />
        </h3>
        <button
            on:click={() => {
                showFilters = true;
            }}>Show Filters</button>
        <h3>
            Sort By:
            <select name="sort" bind:value={sort}>
                {#each sort_options as sort_option}
                    <option>{sort_option}</option>
                {/each}
            </select>
        </h3>
    </div>
    <FilterDialog
        bind:showFilters
        on:reset={() => (filters = structuredClone(defaults))}>
        <div class="filters">
            <div class="row">
                <h4>Minimum Matching Score:</h4>
                <input
                    class="numinput filterinput"
                    type="number"
                    bind:value={filters.score}
                    min="1"
                    max="4" />
            </div>
            <div class="row">
                <h4>GPA Required:</h4>
                <div class="filterinput" style="display: flex;">
                    <input
                        class="gpainput"
                        type="number"
                        bind:value={filters.gpa.min}
                        min="0"
                        max="4"
                        step="0.01" />
                    <h4>-</h4>
                    <input
                        class="gpainput"
                        type="number"
                        bind:value={filters.gpa.max}
                        min="0"
                        max="4"
                        step="0.01" />
                </div>
            </div>
        </div>
    </FilterDialog>
    <div class="header">
        <h3 class="status">Status</h3>
        <h3 class="name">Name</h3>
        <h3 class="gpa">GPA</h3>
        <h3 class="year">Year</h3>
    </div>
    {#if displayed.length == 0}
        <slot name="empty" />
    {/if}
    {#each displayed as applicant}
        <div class="container">
            {#if applicant.status == "suggested"}
                <div class="status">
                    <span class="yellow"></span>
                    <h3>Suggested</h3>
                </div>
            {:else if applicant.status == "applied"}
                <div class="status">
                    <span class="blue"></span>
                    <h3>Applied</h3>
                </div>
            {:else if applicant.status == "awarded"}
                <div class="status">
                    <span class="green"></span>
                    <h3>Awarded</h3>
                </div>
            {:else}
                <div class="status">
                    <span class="red"></span>
                    <h3>Rejected</h3>
                </div>
            {/if}
            <h2 class="name">{applicant.firstName} {applicant.lastName}</h2>
            <h3 class="gpa">{applicant.GPA}</h3>
            <h3 class="year">{applicant.year}</h3>
            <a
                class="review"
                href="/donorScholarships/applicant-{applicant.user}-{applicant.scholarship}">
                <button>Review Applicant</button>
            </a>
        </div>
    {/each}
</section>

<style>
    .controls {
        margin: 50px 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }
    .controls > * {
        margin-left: 20px;
    }
    .header {
        display: flex;
        align-items: center;
    }

    .container {
        display: flex;
        border: 1px solid #ccc;
        padding: 50px 0;
        align-items: center;
        margin: 25px 5%;
        background-color: white;
    }

    .status {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 10%;
    }

    .blue {
        height: 15px;
        width: 15px;
        margin-right: 10px;
        background-color: blue;
        border-radius: 50%;
        display: inline-block;
    }

    .yellow {
        height: 15px;
        width: 15px;
        margin-right: 10px;
        background-color: yellow;
        border-radius: 50%;
        display: inline-block;
    }

    .green {
        height: 15px;
        width: 15px;
        margin-right: 10px;
        background-color: green;
        border-radius: 50%;
        display: inline-block;
    }

    .red {
        height: 15px;
        width: 15px;
        margin-right: 10px;
        background-color: red;
        border-radius: 50%;
        display: inline-block;
    }

    .name {
        position: absolute;
        left: 25%;
    }

    .gpa {
        position: absolute;
        left: 50%;
    }

    .year {
        position: absolute;
        left: 65%;
    }

    .review {
        position: absolute;
        right: 15%;
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
    .controls {
        margin: 50px 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }
    .controls > * {
        margin-left: 20px;
    }
    .numinput {
        width: 3em;
    }
    .gpainput {
        width: 4em;
    }
    .search {
        width: 50%;
        min-width: 300px;
        max-width: 500px;
        border-radius: 20px;
        padding: 10px 25px;
    }
    .header {
        display: flex;
        align-items: center;
    }

    .container {
        display: flex;
        border: 1px solid #ccc;
        padding: 50px 0;
        align-items: center;
        margin: 25px 5%;
        background-color: white;
    }

    .filters {
        display: flex;
        flex-direction: column;
        margin: 10px;
    }
    .filterinput {
        /* left: 0px; */
        margin-left: auto;
        /* margin-right: 15px; */
    }
    .row {
        display: flex;
        margin: 5px 0px;
    }
    h4 {
        text-align: left;
    }
    button,
    select {
        padding: 10px 25px;
        border-radius: 20px;
        border-style: none;
        background-color: rgb(13, 35, 75);
        color: white;
    }

    button:hover,
    select:hover {
        background-color: rgb(55, 141, 189);
        cursor: pointer;
    }
</style>
