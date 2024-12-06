import './App.css'
import NavBar from './components/NavBar'
import Banner from './components/Banner'
import Movies from './components/Movies'
import { BrowserRouter, Route, Routes } from 'react-router'
import FavoriatesPage from './components/FavoriatesPage'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className='mt-[80px]'> {/* Adjust this margin to match NavBar height */}
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Banner />
                <Movies />
              </>
            }
          ></Route>
          <Route path='/fav' element={<FavoriatesPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
