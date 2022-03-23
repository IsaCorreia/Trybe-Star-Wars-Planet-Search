import React from 'react';
import './App.css';
import Table from './components/Table';
import MyContext from './context/myContext';

function App() {
  return (
    <MyContext.Provider>
      <span>Hello, App!</span>
      <Table />
    </MyContext.Provider>
  );
}

export default App;
