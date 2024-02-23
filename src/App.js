// App.js
import React from 'react';
import CollegeTable from './components/CollegeTable';
import colleges from './components/colleges.json'

const App = () => {

  return (
    <div className="container mx-auto my-8">
      <CollegeTable data={colleges} />
    </div>
  );
};

export default App;
