<script>
    export let data;
    const donors = data.donors;
</script>

<section>
    <h1>Scholarship Donors</h1>
    <div class="header">
        <h3 class="name">Name</h3>
        <h3 class="phone">Phone Number</h3>
        <h3 class="email">Email</h3>
    </div>
    {#each donors as donor}
        <div class="container">
            <h3 class="name">{donor.firstName} {donor.lastName}</h3>
            <h3 class="phone">{donor.phone}</h3>
            <h3 class="email">{donor.email}</h3>
            <a href="/adminViewDonors/scholarships-{donor.id}" class="view">
                <button>View their Scholarships</button>
            </a>
        </div>
    {/each}
</section>

<style>
    h1 {
        font-size: 40px;
        margin: 50px;
        text-align: center;
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

    .phone {
        position: absolute;
        left: 30%;
    }

    .email {
        position: absolute;
        left: 50%;
    }

    .view {
        position: absolute;
        right: 10%;
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
