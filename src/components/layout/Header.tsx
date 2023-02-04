import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'

export default function Header() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = React.useState('')
    React.useEffect(() => {
        const handleKeyUp = (e) => {
            if (e.key === 'Enter' && searchQuery !== '') {
                router.push(`/search/${searchQuery}`)
            }
        }
        document.addEventListener('keyup', handleKeyUp)
        return () => document.removeEventListener('keyup', handleKeyUp)
    }, [searchQuery, router])
    return (
        <div className='navbar flex justify-between bg-dark shadow-lg'>
            <div className=''>
                <Link
                    href='http://localhost:3000/library'
                    className='btn-ghost btn text-xl normal-case text-font'
                >
                    Music Hub
                </Link>
            </div>
            <div className='w-1/3 gap-2'>
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
                    <div className='w-10 rounded-full'>
                        {/* <img src='https://placeimg.com/80/80/people' />  */}
                        {/* <Image
                                alt='userImage'
                                src='https://placeimg.com/80/80/people'
                            /> */}
                    </div>
                </label>
                <ul
                    tabIndex={0}
                    className='dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow'
                >
                    <li>
                        <a>Settings</a>
                    </li>
                    <li>
                        <a href='http://localhost:4040/auth/logout'>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
