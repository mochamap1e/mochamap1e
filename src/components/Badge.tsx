export function Badge({ img, url }: { img: string, url?: string }) {
    return (
        <a href={url} target="_blank">
            <img src={`/88x31/${img}`}/>
        </a>
    );
}