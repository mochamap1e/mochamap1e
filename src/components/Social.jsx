export default function Social({ url, image, title }) {
    return <a
        href={url}
        target="_blank"
    >
        <img
            title={title}
            className="social"
            src={`/icons/${image}`}
            draggable={false}
        />
    </a>
}