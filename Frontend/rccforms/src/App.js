import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./GetUser";
import OpenQuestions from "./pages/Questions";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/userlist' element={<UserList/>}/>
                <Route path='/questions' element={<OpenQuestions/>}/>
            </Routes>
        </Router>
    );
}

export default App;