<script>
    let users = [{firstName: "", lastName: "", id: ""}];

    function addUser() {
        users = [...users, {firstName: "", lastName: "", id: ""}];
    }

    /**
     * Remove a user from the array by index.
     * @param {number} index The index of the user to remove.
     */
    function removeUser(index) {
        users = users.filter((_, i) => i !== index);
    }

    function handleSubmit() {
        console.log(users);
    }
</script>

<h1>Find Users Form</h1>

{#each users as user, index}
    <div class="user-info" data-key={index}>
        <input
            type="text"
            bind:value={user.firstName}
            placeholder="First Name" />
        <input type="text" bind:value={user.lastName} placeholder="Last Name" />
        <input type="text" bind:value={user.id} placeholder="ID" />
        {#if users.length > 1}
            <button on:click={() => removeUser(index)}>Remove</button>
        {/if}

        {#if index === users.length - 1}
            <button on:click={addUser}>Add User</button>
        {/if}
    </div>
{/each}

<div class="button-container">
    <button on:click={handleSubmit}>Submit</button>
</div>

<style>
    h1 {
        text-align: center;
    }

    .user-info {
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #fff;
        display: flex;
        align-items: center;
    }

    input {
        flex: 1;
        margin-right: 10px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
    }

    .button-container {
        text-align: center;
    }
</style>
