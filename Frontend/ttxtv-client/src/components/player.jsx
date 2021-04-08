/** 
 * @file React component, media player.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState } from "react";
import {
    Navbar,
    Button,
    Form,
    Nav
} from 'react-bootstrap';
import { Stream, StreamPlayerApi } from "@cloudflare/stream-react";




const PLAYER = () => {

    const ref = React.useRef < StreamPlayerApi > (null);

    return (
        <div>
            <Stream
                streamRef={ref}
                src="4bcf13d23290043d9efb344b56200ebd"
            />
            <div>

            </div>
            <button
                onClick={() => {
                    if (ref.current) {
                        ref.current.currentTime = 30;
                    }
                }}
            >
                seek to 30s
      </button>
            <button
                onClick={() => {
                    if (ref.current) {
                        ref.current.play();
                    }
                }}
            >
                play
      </button>
        </div>
    );
};




export default PLAYER;