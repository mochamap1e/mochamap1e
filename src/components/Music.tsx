import type { Types } from "use-lanyard";

import { Card } from "@/components/Card";

interface Props {
    activity?: Types.Activity
}

export function Music({ activity }: Props) {
    function convertAppleImage(url: string) { return url.substring(url.indexOf("https")).replace("https", "https:/"); }

    return (
        <Card title="Music">
            {activity && ( // TEMPORARY
                <div>
                    <img src={convertAppleImage(activity.assets!.large_image!)}/>
                    <p>Song: {activity.details}</p>
                    <p>Artist: {activity.state}</p>
                    <p>URL: {(activity as any).state_url}</p>
                </div>
            )}
        </Card>
    )
}