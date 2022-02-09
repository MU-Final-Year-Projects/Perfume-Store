import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { DataProvider } from './GlobalState'
import Navbar from './components/navbar/Navbar'
import Pages from './components/mainpages/Pages'
import Header from './components/header/Header'


function App() {
  return (
    <DataProvider>
      <Router>
        <div>
          <Navbar />
          {/* <Header /> */}
          <Pages />

        </div>
      </Router>
    </DataProvider>

  )
}

export default App;
