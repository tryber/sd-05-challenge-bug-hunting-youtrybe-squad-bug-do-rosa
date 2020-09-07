import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import VideoPlayerDescription from './VideoPlayer/VideoPlayerDescription';
import VideoPlayerInfo from './VideoPlayer/VideoPlayerInfo';
import VideoPlayerComments from './VideoPlayerComments/VideoPlayerComments';
import VideoSideBar from './VideoSideBar/VideoSideBar';
import { getVideoInfo, getVideoComments } from './../../../api/service';

function fewComponents(videoId, videoInfo, videoComments) {
  return (
    <section className="player">
      <VideoPlayer embedId={videoId} />
      <VideoPlayerInfo
        statisticsInfo={videoInfo.statistics}
        title={videoInfo.snippet.title}
      />
      <VideoPlayerDescription
        channelTitle={videoInfo.snippet.channelTitle}
        description={videoInfo.snippet.description}
        publishedAt={videoInfo.snippet.publishedAt}
      />
      <VideoPlayerComments
        statisticsInfo={videoInfo.statistics}
        videoComments={videoComments}
      />
    </section>
  );
}
function VideoPage(props) {
  const [videoId, setVideoId] = useState(props.match.params.videoId);
  const [relatedVideos] = useState(props.location.state.data);
  const [videoInfo, setVideoInfo] = useState(null);
  const [videoComments, setVideoComments] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [stateRedirect, setStateRedirect] = useState('');

  useEffect(() => {
    getVideoInfo(videoId).then((data) => setVideoInfo(data.items[0]));

    getVideoComments(videoId).then((data) => setVideoComments(data.items));
  }, []);

  useEffect(() => { setRedirect(false); }, [redirect]);

  function handleSelectedVideo(paramVideoId) {
    setVideoId(paramVideoId);
    getVideoInfo(videoId)
      .then((data) => setVideoInfo(data.items[0]));

    getVideoComments(videoId)
      .then((data) => setVideoComments(data.items));
    setStateRedirect(paramVideoId);
    setRedirect(true);
  }

  if (redirect) return (<Redirect to={`/watch/${stateRedirect}`} />);
  if (!videoInfo || !videoComments) return null;
  return (
    <main>
      {fewComponents(videoId, videoInfo, videoComments)}
      <section className="sidebar">
        <VideoSideBar relatedVideos={relatedVideos} handleSelectedVideo={handleSelectedVideo} />
      </section>
    </main>
  );
}

export default VideoPage;
