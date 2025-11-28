export default function applyGain(media, multiplier) {
    const context = new window.AudioContext();
    const source = context.createMediaElementSource(media);
    const gain = context.createGain();

    gain.gain.value = multiplier;

    source.connect(gain);
    gain.connect(context.destination);

    context.resume();
}