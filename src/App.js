import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
// export const serverApiRoute = (arg) => `https://us-central1-venturedb-f74f4.cloudfunctions.net/api/${arg}
// `
export const serverApiRoute = (arg) => `http://localhost:5000/venturedb-f74f4/us-central1/api/${arg}
`

function App() {
  return (
    <div>
      <Header></Header>
    </div>
  );
}

export default App;
