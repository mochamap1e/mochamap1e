<script>
    import Item from "./Item.svelte";
</script>

<nav id="navbar">
    <Item text="home" path="/"/>
</nav>

<style>
    #navbar {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 75px;
        background-color: black;
    }
</style>