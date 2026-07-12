interface FmTrack {
    album: {
        mbid: string,
        "#text": string
    },
    artist: {
        mbid: string,
        "#text": string
    },
    date: {
        uts: string,
        "#text": string
    },
    image: FmImage[],
    mbid: string,
    name: string,
    streamable: string,
    url: string
}

interface FmImage {
    size: "small" | "medium" | "large" | "extralarge",
    "#text": string
}

interface FmCache {
    data: FmTrack,
    date: number
}