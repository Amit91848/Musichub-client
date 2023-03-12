import React from 'react'
import { MdNoAccounts } from 'react-icons/md'
import { useSelector } from 'react-redux'

import ButtonLink from '@/components/links/ButtonLink'

import { RootState } from '@/store/store'

// interface UnlinkAccountProps {

// }

export const UnlinkAccount: React.FC = () => {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const { active } = useSelector((state: RootState) => state.user)
    return (
        <div className='mt-7 flex justify-center'>
            <ButtonLink
                source='youtube'
                className='h-11 border py-3 px-4 text-[1px] font-light shadow-2xl'
                href={`${backendURL}/api/user/remove?provider=${active}`}
                leftIcon={MdNoAccounts}
                variant='outline'
            >
                Remove Account
            </ButtonLink>
        </div>
    )
}

export default UnlinkAccount
