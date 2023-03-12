import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { updateUser } from '@/store/reducers/user'
import { useAppDispatch } from '@/store/store'

import { source } from '@/constant/services'

import AccountBody from './AccountBody'
import ModalSubheading from './ModalSubheading'
import ModalHeader from '../ModalHeader'

export const Modal: React.FC = () => {
    const [active, setActive] = useState<source | 'settings'>('settings')
    const dispatch = useAppDispatch()
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

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
                    <ModalHeader heading='Settings' type='settings' />
                    <ModalSubheading active={active} setActive={setActive} />
                    <AccountBody active={active} />
                </div>
            </div>
        </div>
    )
}

export default Modal
