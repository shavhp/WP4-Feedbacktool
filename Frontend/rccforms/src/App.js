// Sidebar sources:
// https://blog.openreplay.com/simple-sidebars-with-react-pro-sidebar-and-material-ui/
// https://blog.logrocket.com/creating-responsive-sidebar-react-mui/

import './App.css';
import CurrentUser from './CurrentUser';
import { Routes, Route, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import Homepage from "./pages/Homepage";
import UserList from "./GetUser";
import OpenQuestions from "./pages/OpenQuestions";
import McQuestions from "./pages/McQuestions";
import Forms from "./components/making_forms/Forms";


// Imports MUI icons from:
// https://mui.com/material-ui/material-icons/?theme=Outlined
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';




function App() {
    const { collapseSidebar } = useProSidebar();

    return (
        <div
            id="app"
            style={{
                height: "100vh",
                display: "flex"
            }}
        >
            <Sidebar
                style={{ height: "100vh" }}
            >
                <Menu>
                    <MenuItem
                        icon={<MenuOutlinedIcon/>}
                        style={{ textAlign: "center" }}
                        onClick={() => {
                            collapseSidebar();
                        }}
                    >
                        {" "}
                        {/* Get username / fname function needed here */}
                        <h2><CurrentUser /></h2>
                    </MenuItem>
                    <MenuItem
                        icon={<HomeOutlinedIcon/>}
                        component={<Link to="/"/>}
                    >
                        Home
                    </MenuItem>

                    <MenuItem
                        icon={<Diversity3OutlinedIcon/>}
                    >
                        Teamleden
                    </MenuItem>

                    <SubMenu
                        icon={<QuizOutlinedIcon/>}
                        label="Vragen"
                    >
                        <MenuItem
                            component={<Link
                                to="/openQuestions"/>}
                        >
                            Open vragen
                        </MenuItem>
                        <MenuItem
                            component={<Link
                                to="/mcQuestions"/>}
                        >
                            Meerkeuzevragen
                        </MenuItem>
                    </SubMenu>

                    <SubMenu
                        icon={<NoteAltOutlinedIcon/>}
                        label="Vragenlijsten"
                    >
                        <MenuItem
                            component={<Link
                                to="/forms"/>}
                        >
                            Overzicht
                        </MenuItem>
                        <MenuItem>
                            Responsen
                        </MenuItem>
                    </SubMenu>

                    <MenuItem
                        icon={<AccountCircleOutlinedIcon/>}
                    >
                        Mijn account
                    </MenuItem>
                </Menu>
            </Sidebar>

                <Routes>
                    <Route path='/' element={<Homepage/>}/>
                    <Route path='/userlist' element={<UserList/>}/>
                    <Route path='/openQuestions' element={<OpenQuestions/>}/>
                    <Route path='/mcQuestions' element={<McQuestions/>}/>
                    <Route path="/forms" element={<Forms />} />
                </Routes>
        </div>
    );
}

export default App;