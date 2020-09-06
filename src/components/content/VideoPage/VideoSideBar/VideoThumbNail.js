import React from 'react';

function VideoThumbNail(props) {
  const { imageSource, videoId } = props;
  return (
    <div className="thumbnail">
      <img src={imageSource} alt="cabin" key={videoId} />
      <span>17:30</span>
    </div>
  );
}

export default VideoThumbNail;
