<script></script>

<a href="/">Home</a>

<section>
    <h1>Scholarship Information</h1>
    <div class="block">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Name:</label>
        <input
            type="text"
            value="Super Incredible Awesome Scholarship (Insert name of matched scholarship)"
            readonly />
    </div>
    <div class="block">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Deadline:</label>
        <input type="text" value="Deadline: 05/14/2024" readonly />
    </div>
    <div class="block">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Amount:</label>
        <input type="text" value="$5000" readonly />
    </div>
    <div class="block">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Description:</label>
        <input
            type="text"
            value="This scholarship you must be incredible/Super/Awesome"
            readonly />
    </div>
</section>

<style>
    h1 {
        width: 100%;
        text-align: center;
    }
    .block input[type="text"] {
        margin-bottom: 25px;
        width: 95%;
        border: 1px solid #ccc;
        padding: 3px;
        height: 25px;
        font-weight: bold;
    }
</style>
