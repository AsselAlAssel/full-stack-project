
import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import { Home } from './pages/Home';
import { CreatePost } from './pages/CreatePost';
import Navbar from './components/Navbar';
import PostPage from './pages/PostPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/create-post" exact element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App;
