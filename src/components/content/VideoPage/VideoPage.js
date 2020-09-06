import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import VideoPlayerDescription from './VideoPlayer/VideoPlayerDescription';
import VideoPlayerInfo from './VideoPlayer/VideoPlayerInfo';
import VideoPlayerComments from './VideoPlayerComments/VideoPlayerComments';
import VideoSideBar from './VideoSideBar/VideoSideBar';
import { getVideoInfo, getVideoComments } from './../../../api/service';
import {Redirect} from 'react-router-dom';

function VideoPage(props) {

  const [ videoId, setVideoId ] = useState(props.match.params.videoId);
  const [ relatedVideos, setRelatedVideos ] = useState(props.location.state.data);
  const [ videoInfo, setVideoInfo ] = useState(null);
  const [ videoComments, setVideoComments] = useState(null);
  const [ redirect, setRedirect ] = useState(false);
  const [ stateRedirect, setStateRedirect ] = useState('');

  useEffect(() => {
    getVideoInfo(videoId)
      .then((data) => setVideoInfo(data.items[0]));

    getVideoComments(videoId)
      .then((data) => setVideoComments(data.items));
  }, []);

  useEffect(() => {
    setRedirect(false);
  }, [redirect]);

  function handleSelectedVideo(paramVideoId) {
    setVideoId(paramVideoId);
    // this.setState({ videoId: paramVideoId })
    getVideoInfo(videoId)
      .then((data) => setVideoInfo(data.items[0]));

    getVideoComments(videoId)
      .then((data) => setVideoComments(data.items));
    setStateRedirect(paramVideoId);
    setRedirect(true);
    // setRedirect(true);
    // this.setState({stateRedirect: paramVideoId, redirect: true});
    //  this.props.history.push(`/watch/${videoId}`);
  }

    if (redirect) return (<Redirect to={`/watch/${stateRedirect}`} />);
    if (!videoInfo || !videoComments)
      return <main></main>;

    return (
      <main>
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
        <section className="sidebar">
          <VideoSideBar relatedVideos={relatedVideos} handleSelectedVideo={handleSelectedVideo} />
        </section>
      </main>
    );
}

export default VideoPage;
