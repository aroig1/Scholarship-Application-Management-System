<script>
    // @ts-nocheck
    import FilterDialog from "$lib/components/FilterDialog.svelte";
    export let scholarships;

    let score;
    if (scholarships.length > 0 && scholarships[0].score) {
        score = true;
    } else {
        score = false;
    }

    let search = "";
    let displayed;
    let showFilters = false;
    const defaults = {
        archived: false,
        score: 1,
        deadline: {
            after: null,
            before: null
        },
        gpa: {
            min: 0.0,
            max: 4.0
        },
        amount: {
            min: 0,
            max: Number.POSITIVE_INFINITY
        }
    };
    let filters = structuredClone(defaults);
    const sort_options = ["Name A-Z", "Deadline"];
    let sort = "Name A-Z";
    if (score) {
        sort_options.push("Matching Score");
        sort = "Matching Score";
    }

    function apply_filters(scholarships, search, filters, sort) {
        displayed = scholarships;

        // Searching
        if (search != "") {
            // @ts-ignore
            displayed = displayed.filter((s) => {
                return (
                    s.name.toLowerCase().match(search.toLowerCase()) ||
                    s.description.toLowerCase().match(search.toLowerCase())
                );
            });
        }

        // Filtering
        if (filters.archived) {
            displayed = displayed.filter((s) => {
                return s.archived;
            });
        } else {
            displayed = displayed.filter((s) => {
                return !s.archived;
            });
        }
        if (filters.deadline.after) {
            displayed = displayed.filter((s) => {
                return s.deadline >= new Date(filters.deadline.after);
            });
        }
        if (filters.deadline.before) {
            displayed = displayed.filter((s) => {
                return s.deadline <= new Date(filters.deadline.before);
            });
        }
        displayed = displayed.filter((s) => {
            return (
                s.requiredGPA >= filters.gpa.min &&
                s.requiredGPA <= filters.gpa.max &&
                (s.score >= filters.score || !score) &&
                s.amount >= filters.amount.min &&
                (s.amount <= filters.amount.max || !filters.amount.max)
            );
        });

        // Sorting
        if (score && sort == sort_options[2]) {
            displayed.sort((a, b) => b.score - a.score);
        } else if (sort == sort_options[1]) {
            displayed.sort(
                (a, b) => a.deadline.valueOf() - b.deadline.valueOf()
            );
        } else if (sort == sort_options[0]) {
            displayed.sort((a, b) =>
                a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            );
        }

        return displayed;
    }
    $: displayed = apply_filters(scholarships, search, filters, sort);
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
                <h4>Archived:</h4>
                <input
                    class="checkbox filterinput"
                    type="checkbox"
                    bind:checked={filters.archived} />
            </div>
            {#if score}
                <div class="row">
                    <h4>Minimum Matching Score:</h4>
                    <input
                        class="numinput filterinput"
                        type="number"
                        bind:value={filters.score}
                        min="1"
                        max="4" />
                </div>
            {/if}
            <div class="row">
                <h4>Deadline:</h4>
                <div class="filterinput" style="display: flex;">
                    <input type="date" bind:value={filters.deadline.after} />
                    <h4>-</h4>
                    <input type="date" bind:value={filters.deadline.before} />
                </div>
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
            <div class="row">
                <h4>Amount:</h4>
                <div class="filterinput" style="display: flex;">
                    <input
                        class="dollarinput"
                        type="number"
                        bind:value={filters.amount.min}
                        min="0" />
                    <h4>-</h4>
                    <input
                        class="dollarinput"
                        type="number"
                        bind:value={filters.amount.max}
                        min="0" />
                    <div></div>
                </div>
            </div>
        </div>
    </FilterDialog>
    <div class="header">
        <h3 class="name">Scholarship Name</h3>
        <h3 class="amount">Total Amount</h3>
    </div>
    {#if displayed.length == 0}
        <slot name="empty" />
    {/if}
    {#each displayed as scholarship}
        <div class="container">
            <h3 class="name">{scholarship.name}</h3>
            <h3 class="amount">${scholarship.amount}</h3>
            <slot name="buttons" {scholarship} />
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
    .numinput {
        width: 3em;
    }
    .gpainput {
        width: 4em;
    }
    .dollarinput {
        width: 6em;
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

    .name {
        position: absolute;
        left: 10%;
    }

    .amount {
        position: absolute;
        left: 45%;
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
    input[type="checkbox"] {
        appearance: none;
        background-color: #fff;
        /* margin: -.2em .5em; */
        font: inherit;
        color: currentColor;
        width: 1.15em;
        height: 1.15em;
        outline: 0.15em solid rgb(13, 35, 75);
        border: 0.2em solid white;
        border-radius: 20px;
    }
    /* input[type="checkbox"]::before {
        content: "";
        width: 0.7em;
        height: 0.7em;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em rgb(55, 141, 189);
    } */
    input[type="checkbox"]:checked {
        background-color: rgb(13, 35, 75);
        /* border-color: white; */
    }
    input[type="checkbox"]:hover:not(:checked) {
        background-color: rgb(55, 141, 189);
        /* border-color: white; */
    }
</style>
