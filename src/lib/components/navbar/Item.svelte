<script lang="ts">
    interface Props {
        text: string,
        path: string
    }

    let { text, path }: Props = $props();
</script>

<a
    href={path}
    target="_blank"
>{text}</a>