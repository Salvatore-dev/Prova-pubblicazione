"use client"

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { PauseRounded } from '@mui/icons-material';
import StopIcon from '@mui/icons-material/Stop';
import PauseCircleSharp from '@mui/icons-material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useRef, useState, useEffect } from 'react';



const srce = "https://player.vimeo.com/external/342571552.hd.mp4?s=6aa6f164de3812abadff3dde86d19f7a074a8a66&profile_id=175&oauth2_token_id=57447761"

export default function MediaControlCard() {
    const theme = useTheme();
    const videoRef = useRef<HTMLVideoElement>(null)
    const [play, setPlay] = useState<boolean>(false)

    useEffect(() => {


    }, [play])

    const handleVideoClick = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                // Se è in pausa, fai partire il video
                videoRef.current.play();
                setPlay(true)
            } else {
                // Altrimenti, metti in pausa il video
                videoRef.current.pause();
                setPlay(false)
            }

        }
        // Controlla se il video è attualmente in pausa

    };

    return (
        <Card className=' bg-slate-600' sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        Live From Space
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Mac Miller
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton onClick={handleVideoClick} aria-label="play/pause">
                        {play? <PlayArrowIcon sx={{ height: 38, width: 38 }} /> : <PauseRounded sx={{ height: 38, width: 38}} />}

                    </IconButton>
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </Box>
            </Box>
            {/* <CardMedia
        component="img"
        sx={{ width: 300 }}
        image="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg"
        alt="Live from space album cover"
      /> */}
            <CardMedia
                component={`video`}
                sx={{ width: 300 }}
                src={srce}
                controls={
                    false
                }
                ref={videoRef}
            />
        </Card>
    );
}