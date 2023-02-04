import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CommonTracks } from "@/constant/services"

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
        play: (state, action: PayloadAction<CommonTracks>) => {
            state.currentTrack = { ...action.payload }
        }
    }
})

export const { play } = player.actions
export default player.reducer