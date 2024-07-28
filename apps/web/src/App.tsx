import logo from './logo.svg'
import React from 'react';
import Sidebar from './components/sideBar';
import DashboardView from './components/dashboardView';
import { Outlet } from 'react-router-dom';

function App() {
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