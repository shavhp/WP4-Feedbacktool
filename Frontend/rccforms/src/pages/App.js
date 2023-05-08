import '../css/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./GetUser";
import OpenQuestions from "./OpenQuestions";
import McQuestions from "./McQuestions";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<UserList/>}/>
                <Route path='/userlist' element={<UserList/>}/>
                <Route path='/openquestions' element={<OpenQuestions/>}/>
                <Route path='/mcquestions' element={<McQuestions/>}/>
            </Routes>
        </Router>
    );
}

export default App;