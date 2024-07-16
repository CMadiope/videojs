import { useRef, FC, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import SpeedControl from "./SpeedControl";

const VideoPlayer = (props) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [notes, setNotes] = useState<{ time: number; text: string }[]>([]);
    const { options, onReady } = props;

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");

            videoElement.classList.add("vjs-big-play-centered");
            videoRef.current.appendChild(videoElement);

            const player = (playerRef.current = videojs(
                videoElement,
                options,
                () => {
                    videojs.log("player is ready");
                    onReady && onReady(player);
                }
            ));
        } else {
            const player = playerRef.current;

            player.autoplay(options.autoplay);
            player.src(options.sources);
        }
    }, [options, videoRef]);

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.playbackRate(playbackRate);
        }
    }, [playbackRate]);

    // Dispose the Video.js player when the functional component unmounts

    useEffect(() => {
        const player = playerRef.current;

        const Button = videojs.getComponent("Button");
        const button = new Button(player);

        const myButton = player.getChild("ControlBar").addChild(button, {
            controlText: "My button",
            className: "vjs-visible-text",
        });

        myButton.controlText("My Custom Buttom");
        myButton.addClass("vjs-visible-text");

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    const addNote = (noteText: string) => {
        const currentTime = playerRef.current.currentTime();
        setNotes([...notes, { time: currentTime, text: noteText }]);
    };

    return (
        <>
            <div data-vjs-player>
                <div ref={videoRef} />
            </div>
            <div
                style={{
                    marginTop: "20px",
                }}
            >
                <input
                    type="text"
                    placeholder="Add a note..."
                    onKeyDown={(e: any) => {
                        if (e.key === "Enter" && e.target.value) {
                            addNote(e.target.value);
                            e.target.value = ""; 
                        }
                    }}
                />
                {notes.length > 0 &&
                    notes.map((note, idx) => {
                        return (
                            <div style={{ marginTop: "20px" }} key={idx}>
                                <span>At {note.time} :- </span>
                                <span>{note.text}</span>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default VideoPlayer;
