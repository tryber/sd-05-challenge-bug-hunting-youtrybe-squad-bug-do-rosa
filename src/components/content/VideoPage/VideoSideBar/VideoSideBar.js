import React, { Component, Fragment } from 'react';
import VideoThumbNail from './VideoThumbNail';
import VideoThumbNailInfo from './VideoThumbNailInfo';

import '../../../../css/sideBar.css';

class VideoSideBar extends Component {
  render() {
    const { relatedVideos, handleSelectedVideo } = this.props;
    return (
      <Fragment>
        {relatedVideos.map((video, index) => (
          <Fragment key={index} >
            <div key={video.id.videoId}
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
}

export default VideoSideBar;
