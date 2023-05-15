import '../css/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./GetUser";
import OpenQuestions from "./OpenQuestions";
import McQuestions from "./McQuestions";
import LoginPage from "./Login";
import HomePage from "../components/homepage/HomePage"; // Update the import statement


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/openquestions" element={<OpenQuestions />} />
        <Route path="/mcquestions" element={<McQuestions />} />
      </Routes>
    </Router>
  );
}

export default App;
