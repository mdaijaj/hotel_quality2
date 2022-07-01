import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './components/home'
import DatePickers from './components/home';
import ServiceAdd from './components/hotel/addservice'
import AddHotel from './components/hotel/addhotel'

const Routing=()=>{
  return(
    <>
      <Routes>
        <Route path="/" element={<Home/>} />  
        <Route path="/home" element={<DatePickers/>} />
        <Route path="/addhotel" element={<AddHotel/>} />
        <Route path="/addservice" element={<ServiceAdd/>} />

      </Routes>
    </>
  )
}

const App=()=> {
  return (
    <>
    <div className="App">
      <Navbar/>
      <center><h1>Hotel Quality</h1></center>
      <Routing/>
      {/* <Home/> */}
    </div>
    </>
  );
}

export default App;
