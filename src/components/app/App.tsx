import React from 'react';
import './App.css';
import query from '../../utils/queryMaker';

function App() {
  return (
    <div className="App">
      {JSON.stringify(query())}
      hola
    </div>
  );
}

export default App;
