import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./GetUser";
import OpenQuestionList from "./components/OpenQuestionList";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/userlist' element={<UserList/>}/>
                <Route path='/openquestionlist' element={<OpenQuestionList/>}/>
            </Routes>
        </Router>
    );
}

export default App;