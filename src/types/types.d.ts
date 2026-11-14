interface Song {
    title: string,
    artist: string,
    album: string,
    cover: string,
    timestamp?: number,
    timestampEnd?: number,
    duration?: string,
    isCurrent: boolean
}