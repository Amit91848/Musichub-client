import { SpotifyPlaylist } from "@/constant/services";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('library');

        if (serializedState == null || serializedState == "null") {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}


export const saveState = (state: SpotifyPlaylist) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('library', serializedState);
    } catch (err) {
        console.log(err);
    }
}