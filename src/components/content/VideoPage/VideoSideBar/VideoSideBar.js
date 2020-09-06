import React, { Fragment } from 'react';
import VideoThumbNail from './VideoThumbNail';
import VideoThumbNailInfo from './VideoThumbNailInfo';

import '../../../../css/sideBar.css';

function VideoSideBar(props) {
  const { relatedVideos, handleSelectedVideo } = props;
  console.log('q saquito', relatedVideos);
  return (
    <Fragment>
      {relatedVideos.map((video) => (
        <Fragment key={video.etag} >
          <div
            key={video.id.videoId}
            className="suggested-video"
            onClick={() => handleSelectedVideo(video.id.videoId)}
            data-testid="selectedVideo"
          >
            <VideoThumbNail
              key={video.snippet.thumbnails.medium.url}
              videoId={video.id.videoId}
              imageSource={video.snippet.thumbnails.medium.url}
            />
            <VideoThumbNailInfo
              key={video.snippet.title}
              title={video.snippet.title}
              channel={video.snippet.channelTitle}
            />
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
}

export default VideoSideBar;
