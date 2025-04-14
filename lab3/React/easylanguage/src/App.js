import React from 'react';


import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Progress from './pages/Progress';
import Practice from './pages/Practice';

import Header from './components/Header';
import Footer from './components/Footer';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/lessons" Component={Lessons} />
          <Route path="/progress" Component={Progress} />
          <Route path="/practice" Component={Practice} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
