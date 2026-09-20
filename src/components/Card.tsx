interface Props {
    title: string,
    children: any
}

export function Card({ title, children }: Props) {
    return (
        <div>
            <p>{title}.tsx</p>
            {children}
        </div>
    );
}