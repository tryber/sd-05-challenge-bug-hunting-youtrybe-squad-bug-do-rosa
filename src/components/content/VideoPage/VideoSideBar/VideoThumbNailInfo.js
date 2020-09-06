import React from 'react';

function VideoThumbNailInfo(props) {
  const { title, channel } = props;
  return (
    <div className="thumbnail-info">
      <h2>{title}</h2>
      <div className="channel">{channel}</div>
      <div className="views">792K views</div>
    </div>
  );
}

export default VideoThumbNailInfo;