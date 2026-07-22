interface Game {
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

interface Song {
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

interface Status {
    pfp: string,
    nickname: string,
    username: string,
    online: boolean,
    quote?: string,
    song?: Song,
    game?: Game,
    gameTimeElapsed?: string
}