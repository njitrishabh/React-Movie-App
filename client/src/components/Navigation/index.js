import * as React from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import styles from './styles.css';

const Navigation = () => {
    const location = useLocation();

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ flexGrow: 1, backgroundColor: 'black' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                        </IconButton>
                        <Typography variant="h6">
                            <Link to="/" className={location.pathname === '/' ? "activeRoute" : "notActiveRoute"}><Typography variant="h6" noWrap>
                                Landing Page
                            </Typography></Link>
                        </Typography>
                        <Typography variant="h6">
                            <Link to="/Search" className={location.pathname === '/Search' ? "activeRoute" : "notActiveRoute"}><Typography variant="h6" noWrap>
                                Search Page
                            </Typography></Link>
                        </Typography>
                        <Typography variant="h6">
                            <Link to="/Review" className={location.pathname === '/Review' ? "activeRoute" : "notActiveRoute"}><Typography variant="h6" noWrap >
                                Review Page
                            </Typography></Link>
                        </Typography>
                        <Typography variant="h6">
                            <Link to="/FindTrailer" className={location.pathname === '/FindTrailer' ? "activeRoute" : "notActiveRoute"}><Typography variant="h6" noWrap >
                                Find Trailer
                            </Typography></Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            {/* <Outlet /> */}
        </div>
    );
}

export default Navigation;