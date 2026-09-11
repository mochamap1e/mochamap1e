<script>
    import { Router, createRouter } from "@roxi/routify";
    
    import routes from "../.routify/routes.default.js";

    const router = createRouter({ routes });
</script>

<Router {router}/>

<style>
    :global(body) {
        background-color: rgb(20, 20, 20);
        color: white;
        margin: 0;
    }
</style>