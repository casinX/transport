import React from 'react';

import ReposGet from './api/ReposGet'
// import UserGet from './api/UserGet'

import logo from './logo.svg';
import './App.css';


const reposGet = new ReposGet();

const loadData = async () => {
  console.warn('load Data')
  const [response, error] = await reposGet.call();

  if(response){
    console.warn('res', response)
  }

  if(error){
    console.warn('CATCH ERROR', error)
  }
}

loadData()

// setTimeout(loadData, 5000)
// setTimeout(loadData, 7000)
// setTimeout(loadData, 15000)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
