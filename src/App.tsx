import VideoPlayer from "./components/VideoPlayer";
import "./App.css";

function App() {
    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        experimentalSvgIcons: true,
        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
            skipButtons: {
                forward: 10,
                backward: 10,
            },
        },
        sources: [
            {
                src: "//vjs.zencdn.net/v/oceans.mp4",
                type: "video/mp4",
            },
        ],
    };

    return (
        <div>
            <VideoPlayer
                options={videoJsOptions}
                onReady={() => console.log("The video is ready to play")}
            />
            <div style={{ textAlign: "center" }}>
                <h2>This is a video player</h2>
            </div>
        </div>
    );
}

export default App;
