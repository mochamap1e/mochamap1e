export function Tile({ title, children }: { title: string, children: any }) {
    return (
        <div>
            <p>{title}.tsx</p>
            <div>
                {children}
            </div>
        </div>
    );
}