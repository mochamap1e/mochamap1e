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

export function convertAPMUrl(url: string) {
    return url.substring(url.indexOf("https")).replace("https/", "https://");
}

export function timestampString(date: Date) {
    function format(number: number, unit: string) {
        return `${number} ${unit}${number === 1 ? "" : "s"}`;
    }

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return format(seconds, "second");

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return format(minutes, "minute");

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return format(hours, "hour");

    const days = Math.floor(hours / 24);
    if (days < 7) return format(days, "day");

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return format(weeks, "week");

    const months = Math.floor(days / 30);
    if (months < 12) return format(months, "month");

    const years = Math.floor(days / 365);
    return format(years, "year");
}

export function msToDuration(ms: number) {
    return `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")}`;
}