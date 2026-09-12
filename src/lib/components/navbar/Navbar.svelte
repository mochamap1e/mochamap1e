<script>
    import Item from "./Item.svelte";
</script>

<nav id="navbar">
    <Item text="home" path="/"/>
    <Item text="socials" path="/socials"/>
    <Item text="projects" path="/projects"/>
</nav>

<style>
    #navbar {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 90px;
        gap: 20px;
    }
</style>