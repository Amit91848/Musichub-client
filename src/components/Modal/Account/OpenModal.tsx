import React from 'react'

import clsxm from '@/lib/clsxm'

import { updateActive } from '@/store/reducers/user'
import { useAppDispatch } from '@/store/store'

import { source } from '@/constant/services'

import ServiceIcon from '../../ServiceIcon/ServiceIcon'

interface OpenModalProps {
    source: source
    disabled?: boolean
}

export const OpenModal: React.FC<OpenModalProps> = ({ source, disabled }) => {
    const dispatch = useAppDispatch()

    return (
        <div>
            <label
                onClick={() => {
                    dispatch(updateActive(source))
                }}
                className='relative flex w-fit cursor-pointer'
                htmlFor='my-modal-5'
            >
                <ServiceIcon
                    disabled={disabled}
                    className={clsxm('transition duration-500 hover:scale-125')}
                    source={source}
                    size={32}
                />
            </label>
        </div>
    )
}

export default OpenModal
