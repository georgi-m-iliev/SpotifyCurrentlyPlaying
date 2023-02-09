import React, { useEffect, useRef } from 'react';

function KeyUpHandler() {

    const keysPressedDown = useRef({});

    useEffect(() => {
        window.addEventListener("keyup",
            event => {
                // console.log("KEYUP " + event.key);
                event.key.toUpperCase() == "F" && document.documentElement.requestFullscreen();
            },
            false
        );
    }, []);

    return <></>

}
export default KeyUpHandler;