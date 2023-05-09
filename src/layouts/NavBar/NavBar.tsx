import { Button } from '@mui/material';
import { LoginDialog } from '../../utilities/auth';
import './NavBar.css';
import { NavLink, matchPath, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';

export default function NavBar() {
    const location = useLocation();
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);
    const [openLogin, setOpenLogin] = useState(false);
    const [title, setTitle] = useState('Project Tracker');

    useEffect(() => {
        const newTitle = matchPath('/projects/*', location.pathname) ? 'Project Tracker' : 'Bug Tracker';
        setTitle(newTitle);
    }, [location.pathname]);

    return(
        <header>
            <nav>
                <h1>{title}</h1>
                <NavLink to="projects">Projects</NavLink>
                <NavLink to="bugs">Bugs</NavLink>
                {
                    loggedIn ? null : <Button variant="outlined" onClick={() => setOpenLogin(true)}>Login</Button>
                }
                <LoginDialog openLogin={openLogin} setOpenLogin={setOpenLogin} />
            </nav>
        </header>
    )
}