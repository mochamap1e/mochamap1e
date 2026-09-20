interface LfmSong {
    name: string
    url: string

    artist: {
        "#text": string
    }
    
    image: {
        size: "small" | "medium" | "large" | "extralarge"
        "#text": string
    }[]

    date: {
        uts: string
    }

    "@attr": {
        nowplaying: boolean
    }
}