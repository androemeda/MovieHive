import './App.css'
import NavBar from './components/NavBar'
import Banner from './components/Banner'
import Movies from './components/Movies'
import { BrowserRouter, Route, Routes } from 'react-router'
import FavoriatesPage from './components/FavoriatesPage'

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<><Banner></Banner>
                                 <Movies></Movies></>}>
        </Route>
        <Route path='/fav' element={<FavoriatesPage></FavoriatesPage>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
