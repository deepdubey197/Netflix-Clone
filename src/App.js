
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Player from './pages/Player';
import TvShow from './pages/TvShow';
import Netflix from './pages/Netflix';
import MoviePage from './pages/MoviePage';
import AdminLogin from './pages/AdminLogin';
import BackgroundImage from './components/BackgroundImage';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/signup' element={<SignUpPage/>}/>
        <Route exact path='/player' element={<Player/>}/>
        <Route exact path='/tv' element={<TvShow/>}/>
        <Route exact path='/' element={<Netflix/>}/>
        <Route exact path='/movies' element={<MoviePage/>}/>
        <Route exact path='/admin' element={<AdminLogin/>}/>
        
        
      </Routes>
      
      
    </BrowserRouter>
    
  );
}

export default App;
