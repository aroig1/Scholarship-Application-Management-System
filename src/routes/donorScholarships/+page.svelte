<script>
    import ScholarshipList from "$lib/components/ScholarshipList.svelte";
    export let data;
    const scholarships = data.scholarships;
    // const archived = data.archived_scholarships;
    // let viewArchived = false;
</script>

<section>
    <div class="page_title">
        <h1>View My Scholarships</h1>
        <a href="/createScholarship">
            <button class="createNew">Create New Scholarship</button>
        </a>
    </div>
    <ScholarshipList {scholarships}>
        <div class="buttons" slot="buttons" let:scholarship>
            <a href="/donorScholarships/modify-{scholarship.id}">
                <button>Modify Scholarship</button>
            </a>
            <a href="/donorScholarships/applicants-{scholarship.id}">
                <button>View Applicants</button>
            </a>
        </div>
        <h2 class="empty" slot="empty">
            Looks like you haven't created any scholarships yet.
        </h2>
    </ScholarshipList>
</section>

<style>
    .page_title {
        margin: 50px 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    h1 {
        font-size: 40px;
        margin-bottom: 10px;
    }
    .empty {
        text-align: center;
        margin: 50px;
    }

    .buttons {
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

    .createNew {
        padding: 10px 20px;
        margin: 5px;
    }
</style>
