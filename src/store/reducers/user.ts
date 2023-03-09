import { createSlice } from "@reduxjs/toolkit";

export interface initialState {
    // user: {
    spotify: CommonProfile,
    youtube: CommonProfile,
    soundcloud: CommonProfile
    // }
}

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
    spotify: { ...commonProfileTemplate },
    soundcloud: { ...commonProfileTemplate },
    youtube: { ...commonProfileTemplate }
    // }
}

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        updateUser: (state, action) => {
            //eslint-disable-next-line
            console.log(action)
        }
    }
})

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
