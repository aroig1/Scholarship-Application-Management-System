<script lang="ts">
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    export let showFilters: boolean;
    let dialog: HTMLDialogElement;

    $: if (dialog && showFilters) dialog.showModal();
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
    bind:this={dialog}
    on:close={() => (showFilters = false)}
    on:click|self={() => dialog.close()}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="container" on:click|stopPropagation>
        <div class="header">
            <h3>Filters</h3>
            <button class="close" type="button" on:click={() => dialog.close()}>
                <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                        fill="#070707" />
                </svg>
            </button>
        </div>
        <slot />
        <button
            class="reset"
            type="button"
            on:click={() => dispatch("reset", {})}>Reset</button>
    </div>
</dialog>

<style>
    .container {
        display: flex;
        flex-direction: column;
    }
    .header {
        display: flex;
        flex-direction: row;
    }
    h3 {
        margin-left: 130px;
        margin-top: 5px;
    }
    dialog {
        width: 400px;
        border-radius: 20px;
        border: none;
        padding: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -250px 0 0 -200px;
        /* text-align: center; */
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .close {
        /* padding: 1px; */
        border-radius: 20px;
        border-style: none;
        margin-left: auto;
        /* width: 30px;
        height: 30px; */
        /* background-color: rgb(13, 35, 75); */
        background-color: transparent;
        color: gray;
        /* position: absolute;
        right: 10px; */
    }

    .close:hover {
        background-color: lightgray;
        cursor: pointer;
    }
    .reset {
        padding: 10px 25px;
        border-radius: 20px;
        border-style: none;
        background-color: rgb(13, 35, 75);
        color: white;
    }

    .reset:hover {
        background-color: rgb(55, 141, 189);
        cursor: pointer;
    }
    svg {
        margin: 10px 12px;
    }
</style>
