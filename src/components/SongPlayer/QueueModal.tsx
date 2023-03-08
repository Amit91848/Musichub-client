import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import clsxm from '@/lib/clsxm'

import { RootState } from '@/store/store'

import ModalHeader from '../Modal/ModalHeader'
import ModalBody from '../Modal/Queue/ModalBody'

interface QueueModalProps {
    showQueueModal: boolean
    setShowQueueModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const QueueModal: React.FC<QueueModalProps> = ({
    showQueueModal,
    setShowQueueModal,
}) => {
    const { userQueue, userQueueIndex } = useSelector(
        (state: RootState) => state.player
    )

    return (
        <div
            className={clsxm(
                'absolute h-[300px] max-h-96 w-[400px] overflow-y-hidden rounded-lg border border-[#383f41] shadow-lg',
                showQueueModal
                    ? '-bottom-[100vw] -right-[100vh]'
                    : 'right-7 bottom-24'
            )}
        >
            <ModalHeader
                setShowQueueModal={setShowQueueModal}
                heading='Your Queue'
            />
            <div className='flex h-full max-h-[515px] w-full flex-col items-center overflow-y-scroll bg-queueBg'>
                <ModalBody subheading='Currently Playing' type='current' />
                {userQueue.length != userQueueIndex && (
                    <ModalBody
                        subheading='Next in your queue'
                        type='userQueue'
                    />
                )}
                <ModalBody subheading='Upcoming ' type='queue' />
            </div>
        </div>
    )
}

export default QueueModal
