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

<h1>Find Users Form</h1>

<form method="POST">
    <div class="user-info">
        <input type="text" name="firstName" placeholder="First Name" />
        <input type="text" name="lastName" placeholder="Last Name" />
    </div>

    <button id="mainButton">Submit</button>
</form>

{#if !isViewSearchBar}
    <div class="table-container">
        <h2 class="report-title">Active Donor Report Preview</h2>
        <table class="report-table">
            <thead>
                <tr>
                    <th>First</th>
                    <th>lastName</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each returnData as p}
                    <tr>
                        <td>{p.firstName}</td>
                        <td>{p.lastName}</td>
                        <td
                            ><a href="/FindUsers/editUser-{p.id}"
                                ><button>Update User</button></a
                            ></td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{/if}

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
</style>
