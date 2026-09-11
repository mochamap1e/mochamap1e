<script lang="ts">
    import Navbar from "./components/navbar/Navbar.svelte";

    interface Props {
        children: any,
        title?: string
    }

    let { children, title }: Props = $props();
</script>

<svelte:head>
    <title>mochamap1e{title && ` - ${title}`}</title>
</svelte:head>
<Navbar/>
<main>
    {@render children()}
</main>