import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CommonPlaylist, CommonTracks } from "@/constant/services"

interface initialState {
    currentTrack: CommonTracks,
    isMuted: boolean,
    duration: number,
    seek: number,
    isPlaying: boolean,
    volume: number,
    index: number,
    queue: CommonTracks[],
    userQueueIndex: number,
    userQueue: CommonTracks[],
    playlist: {
        source: string,
        id: string
    },
    nextHref: null | string,
    seekAmount: number,
    isPlayerExpanded: boolean,
    allowAutoplay: boolean,
    shuffleEnabled: boolean,
    repeatEnabled: boolean,
    showYoutubePlayer: boolean
}

interface Play {
    track: CommonTracks
    playlist: CommonPlaylist
}

const initialState: initialState = {
    currentTrack: {
        id: "",
        album: {
            id: "",
            title: ""
        },
        artist: [],
        duration: 0,
        img: [],
        source: "spotify",
        title: ""
    },
    isMuted: false,
    duration: 0,
    seek: 15,
    isPlaying: false,
    volume: 0.5,
    index: 0,
    queue: [],
    userQueueIndex: 0,
    userQueue: [],
    playlist: {
        source: "",
        id: ""
    },
    nextHref: null,
    seekAmount: 15,
    isPlayerExpanded: false,
    allowAutoplay: true,
    shuffleEnabled: false,
    repeatEnabled: false,
    showYoutubePlayer: false
}

const player = createSlice({
    initialState: initialState,
    name: 'player',
    reducers: {
        play: (state, action: PayloadAction<Play>) => {
            const { playlist, track } = action.payload;
            const queue = playlist.tracks;
            const index = queue.findIndex((q) => track.id === q.id);

            const currentPlaylistId = state.playlist.id

            if (playlist.playlistId === currentPlaylistId) {
                // play new track
                return state = {
                    ...state,
                    index,
                    currentTrack: { ...track },
                    queue: [...queue]
                }
            } else {
                // empty user queue and change playlist details
                return state = {
                    ...state,
                    index,
                    currentTrack: { ...track },
                    queue: [...queue],
                    playlist: {
                        id: playlist.playlistId,
                        source: playlist.source
                    },
                    userQueue: [],
                    userQueueIndex: 0
                }
            }
        },
        changeTrack: (state, action: PayloadAction<number>) => {
            const { index, userQueue, userQueueIndex } = state;

            // Songs in user queue
            if (userQueueIndex < userQueue.length && action.payload === 1) {
                const nextTrack = userQueue[userQueueIndex];

                return state = {
                    ...state,
                    userQueueIndex: userQueueIndex + 1,
                    currentTrack: { ...nextTrack },
                }
            }

            // No songs in user queue or prev track
            const changeTo = (index + action.payload + state.queue.length) % state.queue.length;
            const newTrack = state.queue[changeTo];

            return state = {
                ...state,
                index: changeTo,
                currentTrack: { ...newTrack }
            }
        },
        toggleShuffle: (state) => {
            return state = {
                ...state,
                shuffleEnabled: !state.shuffleEnabled
            }
        },
        addToQueue: (state, action: PayloadAction<CommonTracks>) => {
            const track = action.payload
            return state = {
                ...state,
                userQueue: [...state.userQueue, track]
            }
        },
        emptyQueue: (state) => {
            return state = {
                ...state,
                userQueueIndex: 0,
                userQueue: []
            }
        }
    }
})

export const { play, changeTrack, toggleShuffle, addToQueue, emptyQueue } = player.actions
export default player.reducer