"use client"
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


export default function Pagination_Set_articles({pages, setPage, page}: {pages: number, setPage: React.Dispatch<React.SetStateAction<number>>, page: number}) {

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    return (
        <Stack sx={{ margin: '0px 0px 20px' }} spacing={2}>
            <Typography sx={{ color: 'green' }}>Pagina: {page}</Typography>
            <Pagination defaultPage={page} boundaryCount={2} size='large' count={pages} variant="outlined" shape="rounded" onChange={handleChange} />
        </Stack>
    );
}