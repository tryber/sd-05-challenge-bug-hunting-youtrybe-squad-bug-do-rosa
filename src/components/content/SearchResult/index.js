import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoCard from './VideoCard/VideoCard';
import '../../../css/sideBar.css';
import { searchVideos } from '../../../api/service';

function SearchResult(props) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    searchVideos(props.match.params.searchParam)
      .then((dataThen) => setData(dataThen.items.filter((item) => item.id.kind !== 'youtube#channel')))
        .catch((errorCatch) => setError(errorCatch));
  }, [props.match.params.searchParam]);

  if (data.length < 1) return (<div>Loading...</div>);
  if (error !== '') return (<div>Deu erro!</div>);
  return (
    <div>
      {data.map((item) => (
        <Link
          className="thumbnail-card" key={item.etag} to={{
            pathname: `/watch/${item.id.videoId}`,
            state: { data },
          }}
        >
          <VideoCard video={item} />
        </Link>
      ))}
    </div>
  );
}

export default SearchResult;
