import axios from "axios";
import Elysia from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { readFile, writeFile } from "jsonfile";

const viewsFile = "./views.json";

const LASTFM_KEY = process.env.LASTFM_KEY as string;
if (!LASTFM_KEY) { console.error("You must define LASTFM_KEY in .env!"); process.exit(1); }

// 1 second rate limit
const one = new Elysia()
    .use(rateLimit({
        max: 1, 
        duration: 1000,
        generator: (request, _, derived) => {
            return `${request.url} / ${derived.ip}`;
        }
    }))
    .get("/lfm", async ({ status }) => {
        try {
            const response: any = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=mocchamaple&limit=1&api_key=${LASTFM_KEY}&format=json`);
            const tracks: LfmSong[] = response.data.recenttracks.track;

            const track = tracks[0]!;
            const image = track.image.find(image => image.size === "large")!;

            return {
                name: track.name,
                artist: track.artist["#text"],
                url: track.url,
                image: image["#text"],
                timestamp: track.date ? track.date.uts : "now"
            }
        } catch {
            return status(500);
        }
    })
    .get("/views", async () => {
        try {
            return (await readFile(viewsFile)).views;
        } catch {
            return 0;
        }
    });

// 5 minute rate limit
const two = new Elysia()
    .use(rateLimit({
        max: 1, 
        duration: 300000
    }))
    .post("/view", async ({ status }) => {
        async function write(views: number) {
            await writeFile(viewsFile, { views });
        }

        //// locate file, create if it doesn't exist

        let views = 0;

        try {
            views = (await readFile(viewsFile)).views;
        } catch {
            await write(0);
        }

        //// increment

        await write(views + 1);

        /// ok

        return status(200);
    });

new Elysia()
    .resolve(({ request, server, status }) => {
        const ip = request.headers.get("CF-Connecting-IP") || server?.requestIP(request)?.address;

        if (!ip) { return status(400); }

        return { ip };
    })
    .use(one)
    .use(two)
    .listen(3000, ({ port }) => console.log("API running on port", port));