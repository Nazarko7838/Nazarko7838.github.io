import React from 'react';


import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Progress from './pages/Progress';
import Practice from './pages/Practice';

import Profile from './pages/Profile';

import Header from './components/Header';
import Footer from './components/Footer';
import RequireAuth from './components/RequireAuth';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route
            path="/lessons"
            element={
              <RequireAuth>
                <Lessons />
              </RequireAuth>
            }
          />
          <Route
            path="/progress"
            element={
              <RequireAuth>
                <Progress />
              </RequireAuth>
            }
          />
          <Route path="/practice" Component={Practice} />
          <Route path="/profile" Component={Profile} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
