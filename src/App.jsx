import './App.css';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import { BrowserRouter, Route, Routes } from 'react-router';
import FavoriatesPage from './components/FavoriatesPage';
import React, { useState, createContext , useEffect } from 'react';

export const AppContext = React.createContext();

function App() {
  let [favs, setFavs] = useState([]);

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavs(savedFavs);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favs));
  }, [favs]);

  return (
    <AppContext.Provider value={{ favs, setFavs }}>
      <BrowserRouter>
        <NavBar />
        <div className="mt-[80px]">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <Movies />
                </>
              }
            ></Route>
            <Route path="/fav" element={<FavoriatesPage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
