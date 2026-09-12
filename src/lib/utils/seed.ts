function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function seed() {
    return randomInt(100000, 999999);
}