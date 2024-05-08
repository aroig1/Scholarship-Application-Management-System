<script>
    import ScholarshipList from "$lib/components/ScholarshipList.svelte";
    export let data;
    const scholarships = data.scholarships;
</script>

<section>
    <div class="page_title">
        <h1>Available Scholarships</h1>
        <a href="/ReportEngine/ScholarshipReportsPage">
            <button>Available/Archived Scholarship Reports</button>
        </a>
    </div>
    <ScholarshipList {scholarships}>
        <span class="buttons" slot="buttons" let:scholarship>
            <a href="/studentViewScholarship/scholarship-{scholarship.id}">
                <button>View Scholarship</button>
            </a>
        </span>
        <h2 class="page_title" slot="empty">No Scholarships Found</h2>
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
    .buttons {
        margin-right: 5%;
        margin-left: auto;
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
