import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard/VideoCard';
import { Link } from 'react-router-dom';

import '../../../css/sideBar.css';
import { searchVideos } from '../../../api/service';

function SearchResult(props) {
  const [ data, setData ] = useState([]);
  const [ error, setError ] = useState('');
  const { params: { searchParam } } = props.match;
  useEffect(() => {
    searchVideos(searchParam)
      .then((data) => setData(data.items.filter((item) => item.id.kind !== "youtube#channel")))
        .catch(error => setError(error));
  }, []);

  if (data.length < 1) return (<div>Loading...</div>)
  return (
    <div>
      {data.map((item) => (
        <Link className="thumbnail-card" key={item.etag} to={{
          pathname: `/watch/${item.id.videoId}`,
          state: { data: data }
        }}><VideoCard video={item} /></Link>
      ))}
    </div>
  );
}

export default SearchResult;
