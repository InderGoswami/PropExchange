import {BrowserRouter,Routes,Route} from 'react-router-dom'
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './Components/Header';
export default function App() {
  return (
    <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>

    </Routes>
    </BrowserRouter>
  )
}