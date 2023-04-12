import React from "react";
import { Button as MuiButton } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        padding:theme.spacing(2)
    },
    text: {
        textTransform: 'none'
    }
}))

export default function Button(props){
    const {text, size, color, variant, onClick, ...other} = props;
    const classes = useStyles();

    return(
        <MuiButton
        variant={variant || "contained"}
        size={size || "large"}
        color={color || "primary"}
        onClick={onClick}
        {...other}
        classes={{ root: classes.root, text: classes.text }}>
            {text}
        </MuiButton>
        
)
}