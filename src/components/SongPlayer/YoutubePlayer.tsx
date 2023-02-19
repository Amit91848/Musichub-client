import React, { useEffect, useState } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'

import { CommonTracks } from '@/constant/services'

interface YoutubePlayerProps {
    currentTrack: CommonTracks
    isPlaying: boolean
}

export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({
    currentTrack,
    isPlaying,
}) => {
    const [videoId, setVideoId] = useState<string | undefined>(undefined)
    const [playerTarget, setPlayerTarget] = useState()

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        // event.target.pauseVideo()
        setPlayerTarget(event.target)
    }

    const onStateChange: YouTubeProps['onStateChange'] = (event) => {}

    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
            controls: 0,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            autoplay: isPlaying ? 1 : 0,
        },
    }

    useEffect(() => {
        if (currentTrack.source === 'youtube') {
            setVideoId(currentTrack.id)
        } else {
            setVideoId(undefined)
        }
    }, [currentTrack])

    useEffect(() => {
        if (playerTarget) {
            if (isPlaying && currentTrack.source === 'youtube') {
                playerTarget.playVideo()
            } else {
                playerTarget.pauseVideo()
            }
        }
    }, [isPlaying])

    return (
        <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onStateChange}
        />
    )
}

export default YoutubePlayer
