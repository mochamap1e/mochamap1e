<script lang="ts">
    import { Shader, Aurora } from "shaders/svelte";
    
    import { seed } from "../utils/seed";
</script>

<Shader style="position: fixed; top: 0; left; 0; width: 100vw; height: 100vh; z-index: -100;">
    <Aurora
        speed={15}
        height={40}
        intensity={40}
        rayDensity={10}
        waviness={0}
        seed={seed()}
    />
</Shader>