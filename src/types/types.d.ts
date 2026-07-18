interface GameData {
    appId: string,
    timestamp: number,
    name: string,
    details?: string,
    state?: string,
    largeImage?: string,
    largeImageText?: string,
    smallImage?: string,
    smallImageText?: string
}

interface SongData {
    largeImage: string,
    largeImageText?: string,
    smallImage: string,
    smallImageText?: string
    title: string,
    artist: string,
    album: string,
    url: string,
    timeStart: number,
    timeEnd: number
}