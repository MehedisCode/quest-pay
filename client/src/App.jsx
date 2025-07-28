import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import MainLayout from './components/MainLayout';
import './App.css'

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <MainLayout />
    </>
  );
}

export default App;