
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from './pages/Home';
import { CreatePost } from './pages/CreatePost';
import Navbar from './components/Navbar';
import PostPage from './pages/PostPage';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return (
    <div className='App'>
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
    </div>
  )

}

export default App;
