import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
// First three imports are UI related
// useProSideBar is a hook that grants access to the sidebar state.
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

function App() {
    const {collapseSidebar} = useProSidebar();
    return (
        <div id="app"
             style={(
                 {height: "100 vh"},
                     {display: "flex"}
             )}>
            <Sidebar style={{height: "100vh"}}>
                <Menu>
                    <MenuItem
                        icon={<MenuOutlinedIcon/>}
                        onClick={() => {
                            collapseSidebar();
                        }}
                        style={{textAlign: "center"}}
                    >
                        {" "}
                        <h2>Admin</h2>
                    </MenuItem>
                    <MenuItem
                        icon={<HomeOutlinedIcon/>}>Home</MenuItem>
                    <MenuItem icon={<PeopleOutlinedIcon/>}>Team</MenuItem>
                    <MenuItem icon={<ContactsOutlinedIcon/>}>Contacts</MenuItem>
                    <MenuItem icon={<ReceiptOutlinedIcon/>}>Profile</MenuItem>
                    <MenuItem icon={<HelpOutlineOutlinedIcon/>}>FAQ</MenuItem>
                    <MenuItem icon={<CalendarTodayOutlinedIcon/>}>Calendar</MenuItem>
                </Menu>
                <main>
                    <h1 style={{
                        color: "white",
                        marginLeft: "5rem"
                    }}>
                        React-Pro-Sidebar
                    </h1>
                </main>
            </Sidebar>
            <Fragment>
                <Header/>
                <Home/>
            </Fragment>
        </div>
    );
}

export default App;
