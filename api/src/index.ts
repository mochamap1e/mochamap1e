import Elysia from "elysia";
import { readFile, writeFile } from "jsonfile";

const viewsFile = "./views.json";

const LASTFM_KEY = process.env.LASTFM_KEY as string;
if (!LASTFM_KEY) { console.error("You must define LASTFM_KEY in .env!"); process.exit(1); }

new Elysia()
    .get("/views", async () => {
        try {
            return (await readFile(viewsFile)).views;
        } catch {
            return 0;
        }
    })
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
    })
    .listen(3000, ({ port }) => console.log("API running on port", port));