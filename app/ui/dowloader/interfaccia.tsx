"use client"

import React, { useState } from 'react';
import axios from 'axios';

const DownloadForm: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = async () => {
        setError(null);

        if (!url) {
            setError('Please enter a YouTube URL');
            return;
        }

        try {
            setIsLoading(true);

            // Effettua la chiamata GET all'endpoint API
            const response = await fetch(`/api/downloader?url=${url}`);

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to download video');
                setIsLoading(false);
                return;
            }

            // Avvia il download del video
            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'video.mp4';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(downloadUrl);

            setIsLoading(false);
        } catch (err) {
            console.error('Error downloading video:', err);
            setError('An error occurred while downloading the video');
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>YouTube Video Downloader</h2>
            <input
                type="text"
                placeholder="Enter YouTube video URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
                style={{ width: '300px', marginRight: '10px' }}
            />
            <button onClick={handleDownload} disabled={isLoading}>
                {isLoading ? 'Downloading...' : 'Download Video'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default DownloadForm;