import React from 'react';
import ReactHLS from 'react-hls';
import './ShowVideo.css';
import { VIDEO_SERVER } from 'Config.js';
function ShowVideo(props) {
    //props.match.params.id
    const classId = props.classId;
    console.log(props);
    return (
        <div className="pageboard">
            <ReactHLS
                className="videoarea"
                width={'95%'}
                height={650}
                url={`${SERVIDEO_SERVERVER}/video/${classId}_VIDEO.m3u8`}
            />
        </div>
    );
}

export default ShowVideo;
