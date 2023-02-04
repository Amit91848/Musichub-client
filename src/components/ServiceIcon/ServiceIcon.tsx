import React from 'react'
import { BsSpotify, BsYoutube } from 'react-icons/bs'

import { source } from '@/constant/services'

interface ServiceIconProps {
    source: source
    size?: number | string | undefined
    className?: string
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({
    source,
    size,
    className,
}) => {
    return (
        <div className={className}>
            {source === 'spotify' && <BsSpotify size={size} />}
            {source === 'youtube' && <BsYoutube size={size} />}
        </div>
    )
}

export default ServiceIcon
