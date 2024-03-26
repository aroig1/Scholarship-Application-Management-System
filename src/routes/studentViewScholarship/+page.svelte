<script>
    let blocks = Array.from({length: 10}, (_, i) => ({
        id: i
    }));
    function openScholarshipDetails() {
        window.location.href = "/openScholarshipDetails"; // Navigate to the openScholarshipDetails route
    }
</script>

<a href="/">Home</a>

<section>
    <h1>View All Scholarships</h1>
    {#each blocks as _block}
        <div class="container">
            <div>
                <div class="name-block">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>Name:</label>
                    <input
                        type="text"
                        value="Super Incredible Awesome Scholarship (Insert name of matched scholarship) Deadline: 05/14/2024"
                        readonly />
                </div>
                <div class="amount-block">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>Total Amount:</label>
                    <input type="text" value="$5000" readonly />
                </div>
                <!--FIX ME LATER-->
                <button class="view-btn" on:click={openScholarshipDetails}
                ></button>
            </div>
            <div class="big-box" id="description-box"></div>
        </div>
    {/each}

    <style>
        .container {
            display: block;
            flex-wrap: nowrap;
            border: 1px solid #ccc;
            padding: 10px;
        }

        .name-block input[type="text"] {
            margin-bottom: 25px;
            width: 95%;
            border: 1px solid #ccc;
            padding: 3px;
            height: 25px;
            font-weight: bold;
        }
        .amount-block {
            margin-left: auto;
        }
        .amount-block input[type="text"] {
            margin-bottom: 25px;
            width: auto;
            border: 1px solid #ccc;
            padding: 3px;
            height: 25px;
            font-weight: bold;
        }
        .view-btn {
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
</section>
