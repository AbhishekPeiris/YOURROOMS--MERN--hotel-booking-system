import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import LandingScreen from './screens/LandingScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/book/:roomid/:fromdate/:todate" element={<BookingScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/admin' element={<AdminScreen />} />
          <Route path='/' element={<LandingScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
