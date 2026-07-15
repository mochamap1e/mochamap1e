import { Tile } from "../Tile";

import styles from "./Me.module.css";

export function Me() {
    return (
        <Tile title="Me" className={styles.tile}>
            <img src="https://github.com/mochamap1e.png?size=256" className={styles.pfp}/>
            <h1>alex</h1>
            <p>hello i am alex</p>
        </Tile>
    )
}