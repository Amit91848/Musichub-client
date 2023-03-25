import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { updateUser } from '@/store/reducers/user'
import { RootState, useAppDispatch } from '@/store/store'

import AccountBody from './AccountBody'
import ModalSubheading from './ModalSubheading'
import ModalHeader from '../ModalHeader'
import PlaylistBody from '../Playlist/PlaylistBody'

export const Modal: React.FC = () => {
    const dispatch = useAppDispatch()
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

    const active = useSelector((state: RootState) => state.user.active)

    async function getUserData() {
        const res = await axios.get(`${backendURL}/api/user`, {
            withCredentials: true,
        })
        dispatch(updateUser(res.data))
    }
    useEffect(() => {
        getUserData()
        //eslint-disable-next-line
    }, [])

    return (
        <div>
            <input type='checkbox' id='my-modal-5' className='modal-toggle' />
            <div className='modal'>
                <div className='modal-box max-h-[70vh] w-[500px] rounded-none bg-queueBg p-0'>
                    <ModalHeader />
                    {(active === 'soundcloud' ||
                        active === 'spotify' ||
                        active === 'youtube') && (
                        <>
                            <ModalSubheading />
                            <AccountBody />
                        </>
                    )}
                    {active === 'playlists' && <PlaylistBody />}
                </div>
            </div>
        </div>
    )
}

export default Modal
