import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import history from './history';
import './App.css';
import './css/mainContents.css';

import Header from './components/header/Header';
import VideoPage from './components/content/VideoPage/VideoPage';
import SearchResult from './components/content/SearchResult';
import NotFound from './components/content/NotFound';
import InitialPage from './components/content/InitialPage';

function App() {
  return (
    <BrowserRouter >
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/"><InitialPage /></Route>
          <Route
            exact path="/watch/:videoId"
            render={(props) => <VideoPage {...props} history={history} />}
          />
          <Route
            exact path="/results/:searchParam"
            render={(props) => <SearchResult {...props} />}
          />
          <Route path="*"><NotFound /></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
