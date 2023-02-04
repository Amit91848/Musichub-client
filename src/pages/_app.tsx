import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import '@/styles/globals.css'

import { persistor, store } from '@/stores/store'
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
// import '@/styles/colors.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            {/* <PersistGate persistor={persistor}> */}
            <Component {...pageProps} />
            {/* </PersistGate> */}
        </Provider>
    )
}

export default MyApp
