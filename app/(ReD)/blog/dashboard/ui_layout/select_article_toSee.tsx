"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

const Select_article_toSee: React.FC = ()=>{
    const {replace} = useRouter()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log(file.name);
            if (file.name.includes('.md')) {
                const url = `dashboard/new_article/${file.name}`
                replace(url)
            } else {
                alert('Please select a markdown file');
            }
            
        } else {
            console.log('No file selected');
            alert('No file selected');
        }
      };

    return(
        <input
        type='file'
        accept=".md"
        onChange={handleFileChange}
        />
    )
}

export default Select_article_toSee