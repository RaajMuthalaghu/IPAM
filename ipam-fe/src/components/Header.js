import React from 'react'
import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Grid, InputBase, IconButton, Badge } from '@mui/material';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
        
    },
    searchInput: {
        opacity: '0.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    }
}))

export default function Header() {

    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.root}>
            <Toolbar>
                <Grid container
                    alignItems="center">
                    <Grid item>CitiusCloud IPAM
                        {/* <InputBase
                            placeholder="Search topics"
                            className={classes.searchInput}
                            startAdornment={<SearchIcon fontSize="small" />}
                        /> */}
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                        {/* <IconButton>
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsNoneIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={3} color="primary">
                                <ChatBubbleOutlineIcon fontSize="small" />
                            </Badge>
                        </IconButton> */}
                        <Tooltip title="Logout">
                        <IconButton>
                            <PowerSettingsNewIcon fontSize="small" 
                            onClick={(e) => { e.preventDefault(); window.location.href="/"; }}/>
                        </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}