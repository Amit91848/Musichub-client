import React from 'react'

import clsxm from '@/lib/clsxm'

import { source } from '@/constant/services'

import ServiceIcon from '../../ServiceIcon/ServiceIcon'

interface OpenModalProps {
    source: source
    disabled?: boolean
}

export const OpenModal: React.FC<OpenModalProps> = ({ source, disabled }) => {
    return (
        <div>
            <label className='relative flex w-fit' htmlFor='my-modal-5'>
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
