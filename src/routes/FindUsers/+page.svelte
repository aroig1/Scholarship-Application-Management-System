<script>
    let isViewSearchBar = true;
    export let form;
    /** @type {Array<{
     * firstName: string
     * lastName: string
     * id: string
     * }>} */
    let returnData = [];

    if (form != null) {
        isViewSearchBar = form.isSearchView || false;
        //@ts-ignore
        returnData = form.Users || [];
    }
</script>

<section>
    <h1>Find Users Form</h1>

    <form method="POST">
        <div class="user-info">
            <input type="text" name="firstName" placeholder="First Name" />
            <input type="text" name="lastName" placeholder="Last Name" />
        </div>
        <div class="submit_container">
            <button id="mainButton">Submit</button>
        </div>
    </form>

    {#if !isViewSearchBar}
        <div class="header">
            <h3 class="firstName">First Name</h3>
            <h3 class="lastName">Last Name</h3>
        </div>
        {#each returnData as p}
            <div class="container">
                <h2 class="firstName">{p.firstName}</h2>
                <h2 class="lastName">{p.lastName}</h2>
                <a href="/FindUsers/editUser-{p.id}" class="edit">
                    <button>Update User</button>
                </a>
            </div>
        {/each}
    {/if}
</section>

<style>
    h1 {
        text-align: center;
        margin: 50px;
        font-size: 40px;
    }

    form {
        margin: 20px 200px;
    }

    .submit_container {
        display: flex;
        justify-content: center;
        margin-top: 15px;
        margin-bottom: 50px;
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

    .header {
        display: flex;
        align-items: center;
    }

    .container {
        display: flex;
        border: 1px solid #ccc;
        padding: 50px 0;
        align-items: center;
        margin: 25px 15%;
        background-color: white;
    }

    .firstName {
        position: absolute;
        left: 20%;
    }

    .lastName {
        position: absolute;
        left: 45%;
    }

    .edit {
        position: absolute;
        right: 20%;
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
