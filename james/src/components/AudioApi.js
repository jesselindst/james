import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const AudioSender = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('ws://localhost:8000/ws/audio/');
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        mediaRecorder.ondataavailable = async (event) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(event.data);
            reader.onloadend = () => {
                const audioChunk = reader.result;
                socket.emit('message', audioChunk);
            };
        };

        setTimeout(() => {
            mediaRecorder.stop();
        }, 10000); // stop recording after 10 seconds
    };

    return (
        <div>
            <button onClick={startRecording}>Start Recording</button>
        </div>
    );
};

export default AudioSender;