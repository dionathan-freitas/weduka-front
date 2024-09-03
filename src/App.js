import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PeopleList from './components/PeopleList';
import PersonDetail from './components/PersonDetail';
import AddPerson from './components/AddPerson';
import EditPerson from './components/EditPerson';
import AddContact from './components/AddContact';

const App = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <div style={{backgroundColor:"#f7f7f7", padding:"2rem"}}>
      <Routes>
        <Route path="/" element={<PeopleList />} />
        <Route path="/person/:id" element={<PersonDetail />} />
        <Route path="/add-person" element={<AddPerson />} />
        <Route path="/edit-person/:id" element={<EditPerson />} />
        <Route path="/add-contact/:personId" element={<AddContact />} />
      </Routes>
    </div>
  );
};

export default App;
