<script>
    import Index from "./index.svelte";
</script>

<Index/>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap");

    :root {
        --text-color: white;
        --text-color-secondary: gray;
    }
    
    :global(body) {
        background-color: rgb(20, 20, 20);
        margin: 0;
    }

    :global(body, button) {
        color: var(--text-color);
        font-family: "Nunito Sans", Arial, Helvetica, sans-serif;
    }

    :global(h1, p) {
        margin: 0;
    }
</style>