import logo from './logo.svg'
// import React, { useState, useEffect } from 'react';
import Sidebar from './components/sideBar';
import DashboardView from './components/dashboardView';
import { Outlet } from 'react-router-dom';
import axios from 'axios';


function App() {

  // const [user, setUser] = useState({});

  // const getData = () => {
  //   fetch("/api/users")
  //   .then(res => res.json())
  //   .then(json => setUser(json))
  // }

  // useEffect (() => {
  //   getData()
  // }, [])

  return (
    <div className='flex'>
      <div className='basis-[12%] h-[100vh]' >
        <Sidebar />
      </div>
      <div className='basis-[88%] border'>
        <DashboardView />
        <div>
          <Outlet></Outlet>
        </div>
      </div>
        
    </div>
  )
}

export default App;