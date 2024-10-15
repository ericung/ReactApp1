import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const URL = "https://localhost:7260/messageHub";

const SignalR = () => {
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start().then(() => {
                console.log("Connected!");
            }).catch(err => console.error("Connection failed: ", err));
        }
    }, [connection]);
    
    return () => {
        <div>
            <h1>SignalR Connected</h1>
        </div>
    };
}

export default SignalR;