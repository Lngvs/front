import { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import RegisterPage from './pages/RegisterPage.js';
import FiltersPage from './pages/FiltersPage.js';
import ProfilePage from './pages/ProfilePage.js';
import LikesDislikesPage from './pages/LikesDislikesPage.js';
import HistoryPage from './pages/HistoryPage.js';
import Toolbar from "./components/Toolbar";
import mainContext from "./context/mainContext"

function App() {
  const [getLogin, setLogin]=useState(false)
  const [getUser, setUser]=useState()
  const [getUsers, setUsers]=useState([])
  const hooks = {
    getLogin,
    setLogin,
    getUser,
    setUser,
    getUsers,
    setUsers,
  }
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      credentials: 'include'
  }
  fetch('http://localhost:4000/autoLogin', options)
  .then(res => res.json())
      .then(data => {
      console.log(data)
      if (!data.error) {
          setUser(data.user)
          setLogin(true)
      }
  
  })
  }, [])
  return (
    <div className='App'>
      <mainContext.Provider value={hooks}>
        <BrowserRouter>
          <Toolbar/>
          <Routes>
            <Route path='/' element={<RegisterPage />} />
            <Route path="/filter" element={<FiltersPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/liksDislikes" element={<LikesDislikesPage/>}/>
            <Route path="/history" element={<HistoryPage/>}/>
          </Routes>
        </BrowserRouter>
      </mainContext.Provider>
    </div>
  
  
  );
}

export default App;
