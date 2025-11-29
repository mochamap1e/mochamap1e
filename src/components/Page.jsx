import Panel from "./Panel"

export default function Page({ name, rows, columns }) {
    return (
        <div>
            <div
                className="grid gap-1"
                style={{
                    gridTemplateRows: `repeat(${rows}, 110px)`,
                    gridTemplateColumns: `repeat(${columns}, 150px)`
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

            </div>
        </div>
    )
}