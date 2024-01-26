"use client"

import * as React from 'react';
import { useRef, useState, useEffect } from 'react';

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
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import { Videos } from 'pexels';

type Count = {
    current: number;
    limit: number
}


const exemple = {
    "id": 1448735,
    "width": 4096,
    "height": 2160,
    "url": "https://www.pexels.com/video/video-of-forest-1448735/",
    "image": "https://images.pexels.com/videos/1448735/free-video-1448735.jpg?fit=crop&w=1200&h=630&auto=compress&cs=tinysrgb",
    "duration": 32,
    "user": {
        "id": 574687,
        "name": "Ruvim Miksanskiy",
        "url": "https://www.pexels.com/@digitech"
    },
    "video_files": [
        {
            "id": 58649,
            "quality": "sd",
            "file_type": "video/mp4",
            "width": 640,
            "height": 338,
            "link": "https://player.vimeo.com/external/291648067.sd.mp4?s=7f9ee1f8ec1e5376027e4a6d1d05d5738b2fbb29&profile_id=164&oauth2_token_id=57447761"
        }

    ],
    video_pictures: [
        {
            "id": 133236,
            "picture": "https://static-videos.pexels.com/videos/1448735/pictures/preview-0.jpg",
            "nr": 0
        }],
}

export default function MediaControlCardPexel({ videos, query }: {
    videos: Videos | null, 
    query?: string
}) {

    const theme = useTheme();
    const videoRef = useRef<HTMLVideoElement>(null)


    const [play, setPlay] = useState<boolean>(false)
    const [count, setCount] = useState<Count>({
        current: 0,
        limit: 0
    })
    const [value, setValue] = React.useState<number>(100);

    const handleChangeVolume = (event: Event, newValue: number | number[]) => {
        //console.log(event, newValue);

        setValue(newValue as number);
    };

    useEffect(() => {
        if (videoRef.current) {
            console.log(videoRef.current);
           videoRef.current.volume = value / 100
        }
       
    }, [value])

    useEffect(() => {
        setCount({
            current: 0,
            limit: videos?.per_page ? videos.per_page - 1 : 0
        })
    }, [videos])
    //console.log(count);


    function prevPage() {
        setCount({
            ...count,
            current: count.current - 1
        })
        setPlay(false)
    }

    function nextPage() {
        setCount({
            ...count,
            current: count.current + 1
        })
        setPlay(false)
    }

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
    };
    return (
        <Card className=' bg-slate-200 w-[80%] m-auto' sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '0 1 auto' }}>
                    <Typography component="div" variant="h5">
                        {(!query || !videos?.videos[0]?.video_files[0]?.link) ? 'Foresta' : query}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {videos?.videos[count.current]?.user?.name || exemple.user.name}
                    </Typography>
                    <Typography variant='subtitle2' className='text-green-500 font-medium text-base hover:cursor-pointer hover:underline' component={`a`} href='https://www.pexels.com' target='_blak'>
                    Videos provided by Pexels
                    </Typography>
                </CardContent>
                <Box
                className=' flex items-center flex-wrap' 
                sx={{ pl: 1, pb: 1 }}
                >
                    <IconButton
                        onClick={prevPage}
                        disabled={count.current === 0 && true} aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton onClick={handleVideoClick} aria-label="play/pause">
                        {!play ? <PlayArrowIcon sx={{ height: 38, width: 38 }} /> : <PauseRounded sx={{ height: 38, width: 38 }} />}

                    </IconButton>
                    <IconButton
                        onClick={nextPage}
                        disabled={count.current === count.limit && true} aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                    <Box sx={{ width: 200 }}>
                        <Stack spacing={2} direction="row" alignItems="center">
                            <VolumeDown />
                            <Slider aria-label="Volume"
                                value={value} onChange={handleChangeVolume}
                            />
                            <VolumeUp />
                        </Stack>
                    </Box>
                </Box>
            </Box>
            {videos?.videos[0]?.video_files[0]?.link ? <CardMedia
                className='w-full h-auto'
                component={`video`}
                //itemType='mp4'
                //sx={{ width: 350 }}
                src={videos?.videos[count.current]?.video_files[0]?.link}
                controls={
                    false
                }
                poster={videos.videos[count.current].video_pictures[0].picture}
                ref={videoRef}
            /> : <CardMedia
                className='w-full h-auto'
                component={`video`}
                src={exemple.video_files[0].link}
                controls={false}
                poster={exemple.video_pictures[0].picture}
                ref={videoRef}
            />}
        </Card>
    );
}