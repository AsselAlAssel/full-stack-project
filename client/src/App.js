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
import NotFound from './pages/NotFound';
import UserInformation from './pages/UserInformation';

function App() {
  const isLogin = !!localStorage.getItem('accessToken');
  const [AuthState, setAuthState] = useState({
    username: "",
    id: "",
    isLogin: isLogin
  });
  useEffect(() => {
    console.log(localStorage.getItem('accessToken'))

    console.log(1)
    axios.get("http://localhost:3300/auth/auth", { headers: { token: localStorage.getItem("accessToken") } }).then((response) => {
      console.log(2)
      if (response.data.error) {
        setAuthState({
          ...AuthState, isLogin: false
        });
      } else {
        const data = response.data
        console.log(data)
        setAuthState(
          {
            username: data.username,
            id: data.id,
            isLogin: true

          });
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
            <Route path="/user-info/:id" element={<UserInformation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div >
  )

}

export default App;
