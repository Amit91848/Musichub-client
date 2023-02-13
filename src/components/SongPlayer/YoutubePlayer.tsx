import { CommonTracks } from '@/constant/services'
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'

interface YoutubePlayerProps {
    currentTrack: CommonTracks
    isPlaying: boolean
}

export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({
    currentTrack,
    isPlaying,
}) => {
    const [videoId, setVideoId] = useState<string>('')
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    }

    useEffect(() => {
        if (currentTrack.source === 'youtube') {
            console.log(currentTrack.id)
            setVideoId(currentTrack.id)
        }
    }, [currentTrack])

    return (
        <div>
            {/* <YouTube
                videoId='hT_nvWreIhg'
                opts={{
                    height: '100%',
                    width: '100%',
                    playerVars: {
                        controls: 0,
                        fs: 0,
                        iv_load_policy: 3,
                        modestbranding: 1,
                        // autoplay: youtubeIsPlaying ? 1 : 0
                    },
                }}
                // onReady={handleYoutubeReady}
                // onEnd={onEnd}
                // onError={handleYoutubePlayerError}
                // onStateChange={handleStateChange}
            /> */}
            <YouTube opts={opts} videoId='hT_nvWreIhg' />
        </div>
    )
}

export default YoutubePlayer
