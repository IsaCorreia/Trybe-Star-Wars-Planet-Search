import React from 'react';
import './App.css';
import FilterBar from './components/FilterBar';
import Table from './components/Table';
import MyProvider from './context/myProvider';

function App() {
  return (
    <MyProvider>
      <FilterBar />
      <Table />
    </MyProvider>
  );
}

export default App;
