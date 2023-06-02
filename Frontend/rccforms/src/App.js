// Sidebar sources:
// https://blog.openreplay.com/simple-sidebars-with-react-pro-sidebar-and-material-ui/
// https://blog.logrocket.com/creating-responsive-sidebar-react-mui/

import './App.css';
import CurrentUser from './CurrentUser';
import { Routes, Route, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import Questions from "./pages/Questions";
import Forms from "./components/making_forms/Forms";
import LoginPage from './pages/Login';
import RegistrationForm from './pages/Registration';


// Imports MUI icons from:
// https://mui.com/material-ui/material-icons/?theme=Outlined
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';


function App() {
    const { collapseSidebar } = useProSidebar();

    return (
        <div
            id="app"
            style={(
                { height: "100vh" },
                    { display: "flex" }
            )}
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
                    >
                        Home
                    </MenuItem>
                    <MenuItem
                        icon={<CreateOutlinedIcon />}
                        component={<Link
                            to="/forms"/>}
                    >
                        Forms
                    </MenuItem>
                    
                    <MenuItem
                        icon={<Diversity3OutlinedIcon/>}
                    >
                        Teamleden
                    </MenuItem>

                    <MenuItem
                        icon={<QuizOutlinedIcon/>}
                        component={<Link
                            to="/questions"/>}
                    >
                        Vragen
                    </MenuItem>

                    <SubMenu
                        icon={<NoteAltOutlinedIcon/>}
                        label="Vragenlijsten"
                    >
                        <MenuItem>
                            Samenstellen
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

                    <MenuItem
                        icon={<LoginOutlinedIcon />}
                        component={<Link
                            to="/Login"/>}
                    >
                        Login
                    </MenuItem>

                    <MenuItem
                        icon={<InputOutlinedIcon />}
                        component={<Link
                            to="/Registration"/>}
                    >
                        Registration
                    </MenuItem>
                </Menu>
            </Sidebar>

                <Routes>
                    <Route path='/questions' element={<Questions/>}/>
                    <Route path="/forms" element={<Forms />} />
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path="/registration" element={<RegistrationForm />} />
                </Routes>
        </div>
    );
}

export default App;