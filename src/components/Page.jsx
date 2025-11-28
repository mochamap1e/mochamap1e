import Panel from "./Panel"

export default function Page({ name, rows, columns }) {
    return (
        <div>
            <h1 className="text-white text-4xl">{name}</h1>

            <div
                className="grid gap-2"
                style={{
                    gridTemplateRows: `repeat(${rows}, 110px)`,
                    gridTemplateColumns: `repeat(${columns}, 140px)`
                }}
            >

            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />
            <Panel />

            </div>
        </div>
    )
}