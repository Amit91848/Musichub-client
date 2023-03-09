import axios from "axios"

export const useSpotifyWebPlaybackSDKScript = () => {
    if (typeof window !== 'undefined') {
        if (!window.Spotify) {
            appendSpotifySDKScriptToDOM()
        }
    }
}

export const appendSpotifySDKScriptToDOM = () => {
    const spotifyScript = document.createElement('script')
    spotifyScript.id = 'spotify-script'
    spotifyScript.src = 'https://sdk.scdn.co/spotify-player.js'
    document.head.append(spotifyScript)
}

export const fetchAccessToken = async (jwt: string): Promise<string> => {
    const tokenInstance = createInstanceWithBearer(jwt);

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const token = await tokenInstance.get(`${backendURL}/api/spotify/access_token`, { withCredentials: true });
    return token.data;
}

export const getDeviceId = async (_: string): Promise<string> => {
    // const deviceId = createInstanceWithBearer(jwt);
    return 'abc';

}

export const createInstanceWithBearer = (jwt: string) => {
    return axios.create({
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    })
}