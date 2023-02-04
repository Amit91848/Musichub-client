import { fetchAccessToken, getDeviceId } from ".";

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2I2YjNjOTg4OTdlOGRlYjE5ZTc0YzIiLCJpYXQiOjE2NzI5MjM0MjYsImV4cCI6MTY3NTUxNTQyNn0.aT7seVEkhYwKJ4IBeWhq_D2v74kPN_nDLR9rqbW0Zqw'

export class SpotifyWebPlaybackSDK {
    playerName: string
    volume: number;
    player?: Spotify.Player;
    accessToken?: string | null;
    deviceId?: string | null;
    timer?: string | null;

    constructor(playerName: string, volume: number) {
        this.playerName = playerName;
        this.volume = volume;
        this.accessToken = null;

        this.deviceId = null;
        this.timer = null;

        this.fetchAndSetToken = this.fetchAndSetToken.bind(this);
        this.load = this.load.bind(this);
    }

    async fetchToken() {
        const token = await fetchAccessToken(jwt);
        return token;
    }

    initPlayer() {
        if (!this.player) {
            this.player = new window.Spotify.Player({
                getOAuthToken: this.fetchAndSetToken,
                name: this.playerName,
                volume: this.volume | 1
            })

            this.addListeners();
        }

        return this.player.connect();
    }

    setAccessToken(token: string) {
        this.accessToken = token;
    }

    setDeviceId(deviceId: string) {
        this.deviceId = deviceId;
    }

    async fetchAndSetToken(cb) {
        return this.fetchToken()
            .then(token => {
                this.setAccessToken(token);
                if (cb) cb(token);
            })
            .catch(e => console.error(`Error refreshing spotify player ${e}`));
    }

    pause() {
        return this.player?.pause()
    }

    load(trackId: string) {
        const url = "https://api.spotify.com/v1/me/player/play?device_id=" + this.deviceId;

        console.log('putting play')
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken
            },
            body: JSON.stringify({
                uris: [`spotify:track:${trackId}`],
                position_ms: 0
            })
        })
            .then((response) => console.log('response from play: ', response))
            .catch(error => {
                //
                console.log('error from play ', error)
            });
    }

    play() {
        return this.player?.resume();
    }

    connect_to_device() {
        console.log('connecting to device');
        fetch("https://api.spotify.com/v1/me/player", {
            method: "PUT",
            body: JSON.stringify({
                device_ids: [this.deviceId],
                play: false,
            }),
            headers: new Headers({
                Authorization: "Bearer " + this.accessToken,
            }),
        }).then((response) => console.log('connect to device response: ', response));
    };

    addListeners() {
        this.player?.addListener('ready', e => {
            this.setDeviceId(e.device_id);
            this.connect_to_device()
        })
        this.player?.addListener("not_ready", ({ device_id }) => {
            console.log("Device ID has gone offline", device_id);
        });

        this.player?.addListener("player_state_changed", (state) => {
            // console.log('state: ', state);
        });
        this.player?.addListener('initialization_error', e => {
            console.error('Initialization error: ', e);
        });
        this.player?.addListener("authentication_error", e => {
            console.error("authentication_error", e.message);
        });
        this.player?.addListener("account_error", e => {
            console.error("account_error", e.message);
        });
        this.player?.addListener("playback_error", e => {
            console.error("playback_error", e);
        });
    }
}