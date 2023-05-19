import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './GetUser';
import OpenQuestions from './OpenQuestions';
import McQuestions from './McQuestions';
import LoginPage from './Login';
import RegistrationForm from './Registration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/userlist" element={<UserList />}/>
        <Route path="/openquestions" element={<OpenQuestions />}/>
        <Route path="/mcquestions" element={<McQuestions />}/>
        <Route path="/registration" element={<RegistrationForm />}/>
      </Routes>
    </Router>
  );
}

export default App;