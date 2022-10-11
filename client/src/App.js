import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from './pages/Home';
import { CreatePost } from './pages/CreatePost';
import Navbar from './components/Navbar';
import PostPage from './pages/PostPage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContext';
import axios from 'axios';

function App() {
  const isLogin = !!localStorage.getItem('accessToken');
  const [AuthState, setAuthState] = useState(isLogin);
  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", { headers: { accessToken: localStorage.getItem("accessToken") } }).then((response) => {
      if (response.data.error) {
        setAuthState(false);
      } else {
        setAuthState(true);
      }
    });
  }, [])
  return (
    <div className='App'>
      <AuthContext.Provider value={{ AuthState, setAuthState }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/create-post" exact element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div >
  )

}

export default App;
