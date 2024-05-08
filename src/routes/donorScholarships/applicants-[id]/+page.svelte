<script>
    import ApplicantList from "$lib/components/ApplicantList.svelte";
    export let data;
    const applicants = data.applicants;
</script>

<section>
    <h1>Applications</h1>
    <ApplicantList {applicants} />
</section>

<style>
    h1 {
        font-size: 40px;
        margin: 40px;
        text-align: center;
    }
</style>
