export function Social({ text, icon, link }: { text: string, icon: string, link: string }) {
    return (
        <a href={link} target="_blank">
            <img
                title={text}
                src={`/socials/${icon}.svg`}
                draggable={false}
                className="social"
            />
        </a>
    );
}