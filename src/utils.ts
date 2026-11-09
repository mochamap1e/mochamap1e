export function seed() {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

export function isChristmas() {
    const month = new Date().getMonth();
    return month >= 10 || month <= 1;
}

export function getOrdinalSuffix(n: number) {
    const remainder10 = n % 10;
    const remainder100 = n % 100;

    if (remainder100 >= 11 && remainder100 <= 13) {
        return `${n}th`;
    }

    switch (remainder10) {
        case 1:  return `${n}st`;
        case 2:  return `${n}nd`;
        case 3:  return `${n}rd`;
        default: return `${n}th`;
    }
}