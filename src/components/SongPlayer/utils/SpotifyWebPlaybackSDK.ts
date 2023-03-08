import { changeTrack } from "@/store/reducers/player";
import { useAppDispatch } from "@/store/store";

import { fetchAccessToken } from ".";

const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2I2YjNjOTg4OTdlOGRlYjE5ZTc0YzIiLCJpYXQiOjE2NzI5MjM0MjYsImV4cCI6MTY3NTUxNTQyNn0.aT7seVEkhYwKJ4IBeWhq_D2v74kPN_nDLR9rqbW0Zqw'

export class SpotifyWebPlaybackSDK {
    playerName: string
    volume: number;
    player?: Spotify.Player;
    accessToken?: string | null;
    deviceId?: string | null;
    timer?: string | null;
    position?: number;
    songEnded?: boolean

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
            console.log('initialized player')

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
                console.log('setting accesstoken ', token)
                this.setAccessToken(token);
                if (cb) cb(token);
            })
            .catch(e => console.error(`Error refreshing spotify player ${e}`));
    }

    pause() {
        this.player?.getCurrentState().then(state => {
            if (!state) {
                console.log('User is not playing music through the Web Playback SDK')
                return
            };
            this.position = state.position
        })
        return this.player?.pause()
    }

    async seek(position: number) {
        await this.player?.seek(position);
    }

    async load(trackId: string, position = 0) {
        this.fetchAndSetToken;
        const url = "https://api.spotify.com/v1/me/player/play?device_id=" + this.deviceId;
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken
            },
            body: JSON.stringify({
                uris: [`spotify:track:${trackId}`],
                position_ms: position
            })
        })
            .then((response) => this.songEnded = false)
            .catch(error => {
                console.log('error from play ', error)
            });
    }

    play() {
        return this.player?.resume();
    }

    updateVolume(volume: number) {
        return this.player?.setVolume(volume)
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
        }).then((response) => console.log('connected to device'));
    };

    addListeners() {
        this.player?.addListener('ready', e => {
            this.setDeviceId(e.device_id);
            this.connect_to_device()
        })
        this.player?.addListener("not_ready", ({ device_id }) => {
            console.log("Device ID has gone offline", device_id);
        });

        this.player?.removeListener("player_state_changed");
        this.player?.addListener("player_state_changed", state => {
            this.handleStateChange(state);
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

    handleStateChange(state: Spotify.PlaybackState) {
        if (!state.paused && !state.loading && state.track_window.previous_tracks.find(x => x.id === state.track_window.current_track.id)) {
            console.log('song ended in handleState change')
            this.songEnded = true
        }
    }
}