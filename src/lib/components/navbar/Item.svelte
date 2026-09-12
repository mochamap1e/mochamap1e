<script lang="ts">
    interface Props {
        text: string,
        path: string
    }

    let { text, path }: Props = $props();
    let hovered = $state(false);
</script>

<button
    id="item"
    onclick={() => window.location.pathname = path}
    onmouseenter={() => hovered = true}
    onmouseleave={() => hovered = false}
>
    <p id="text">{text}</p>
    <div
        id="underline"
        style={`opacity: ${hovered || (window.location.pathname === path ? "1" : "0")};`}
    ></div>
</button>

<style>
    #item {
        display: flex;
        position: relative;
        align-items: center;
        flex-direction: column;
        background: none;
        border: none;
        cursor: pointer;
        gap: 4px;
    }

    #text {
        font-size: 28px;
        text-decoration: none;
        pointer-events: none;
    }

    #underline {
        position: absolute;
        background-color: white;
        bottom: -5px;
        width: 100%;
        height: 2px;
        transition: opacity 0.2s;
    }
</style>