
import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import { Home } from './pages/Home';
import { CreatePost } from './pages/CreatePost';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Link to='/create-post'>Create Post</Link>
        <Link to='/' className='GoToHomePage'>Home Page</Link>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/create-post" exact element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  )

}

export default App;
