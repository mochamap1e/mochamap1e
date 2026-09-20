import type { Types } from "use-lanyard";

import useAxios from "axios-hooks";
import { useState, useEffect } from "react";
import { Skeleton } from "boneyard-js/react";

import { Card } from "@/components/Card";

interface Props {
    activity?: Types.Activity
}

interface State {
    image?: string
    song?: string
    artist?: string
    time?: string
    song_url?: string
    artist_url?: string
}

export function Music({ activity }: Props) {
    function convertAppleImage(url: string) { return url.substring(url.indexOf("https")).replace("https", "https:/"); }

    const [{ data, loading }, refetch] = useAxios("http://localhost:3000/lfm");

    const [state, setState] = useState<State>();

    useEffect(() => {
        if (activity) {
            setState({
                image: convertAppleImage(activity.assets!.large_image!),
                song: activity.details!,
                artist: activity.state,
                time: "listening now",
                song_url: (activity as any).details_url,
                artist_url: (activity as any).state_url,
            });
        }
    }, [activity]);

    return (
        <Card title="Music">
            {state && (
                <div>
                    {/* <img src={state.image}/> */}
                    <Skeleton name="song" loading={loading}>
                        <a
                            href={state.song_url}
                            target="_blank"
                        >{state.song}</a>
                    </Skeleton>
                    <a
                        href={state.artist_url}
                        target="_blank"
                    >{state.artist}</a>
                    <p>{state.time}</p>
                </div>
            )}
        </Card>
    )
}