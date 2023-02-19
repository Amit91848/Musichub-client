import { useRouter } from 'next/router'
import * as React from 'react'

export default function Header() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = React.useState('')
    React.useEffect(() => {
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && searchQuery !== '') {
                router.push(`/library/search/${searchQuery}`)
            }
        }
        document.addEventListener('keyup', handleKeyUp)
        return () => document.removeEventListener('keyup', handleKeyUp)
    }, [searchQuery, router])
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
    return (
        <div className='navbar flex justify-between bg-dark shadow-lg'>
            <div className='ml-4 w-1/3 gap-2'>
                <div className='form-control w-full'>
                    <input
                        type='text'
                        placeholder='Search'
                        className='input-bordered input bg-searchBar text-font'
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                        }}
                    />
                </div>
            </div>
            <div className='dropdown-end dropdown'>
                <label
                    tabIndex={0}
                    className='btn-ghost btn-circle avatar btn bg-red-500'
                >
                    <div className='w-10 rounded-full'></div>
                </label>
                <ul
                    tabIndex={0}
                    className='dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow'
                >
                    <li>
                        <a>Settings</a>
                    </li>
                    <li>
                        <a href={`${backendURL}/auth/logout`}>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
