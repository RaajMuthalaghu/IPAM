import React from "react";
import { Alert, Snackbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ClassNames } from "@emotion/react";

const useStyles = makeStyles(theme => ({
    root: {
        top: theme.spacing(90)
    }
}))

export default function Notification(props){
    const {notify, setNotify} = props;
    const classes = useStyles()

    const handleClose = (event, reason) =>{
        if (reason === 'clickaway'){
            return;
        }
        setNotify({
            ...notify,
            isOpen:false
        })
    }
    return(
        <Snackbar
        open={notify.isOpen}
        className={ClassNames.root}
        autoHideDuration={3000}
        anchorOrigin={{ vertical:'top', horizontal:'right'}}
        onClose={handleClose}>
            <Alert severity={notify.type}
            onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}