import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./GetUser";
import OpenQuestions from "./pages/OpenQuestions";
import McQuestions from "./pages/McQuestions";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/userlist' element={<UserList/>}/>
                <Route path='/questions' element={<OpenQuestions/>}/>
                <Route path='/mcquestions' element={<McQuestions/>}/>
            </Routes>
        </Router>
    );
}

export default App;