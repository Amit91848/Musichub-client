import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { source } from "@/constant/services";

export interface initialState {
    // user: {
    active: source | 'settings' | 'playlists' | 'queue'
    spotify: CommonProfile,
    youtube: CommonProfile,
    soundcloud: CommonProfile
    // }
}

// export interface updateUser {
//     spotify: 
// }

export interface CommonProfile {
    isConnected: boolean,
    id: string | null,
    profileUrl: string | null,
    username: string | null,
    image: string | null
}

const commonProfileTemplate: CommonProfile = {
    isConnected: false,
    id: null,
    profileUrl: null,
    username: null,
    image: null
}


const initialState: initialState = {
    // user: {
    active: 'settings',
    spotify: { ...commonProfileTemplate },
    soundcloud: { ...commonProfileTemplate },
    youtube: { ...commonProfileTemplate }
    // }
}

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        updateUser: (state, action: PayloadAction<initialState>) => {
            //eslint-disable-next-line
            const { soundcloud, spotify, youtube } = action.payload
            return state = {
                ...state,
                spotify: { ...spotify },
                soundcloud: { ...soundcloud },
                youtube: { ...youtube }
            }
        },
        updateActive: (state, action: PayloadAction<initialState["active"]>) => {
            return state = {
                ...state,
                active: action.payload
            }
        }
    }
})

export const { updateUser, updateActive } = userSlice.actions;
export default userSlice.reducer;
