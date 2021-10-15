import React, { useEffect } from 'react';
import AppLayout from './components/app-layout'
import { setCustomNotification } from './utils/notify'

export default function App() {
    useEffect(() => {
        setCustomNotification()
    }, []);

    return (
        <AppLayout/>
    );
}
