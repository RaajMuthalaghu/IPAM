import React from "react";
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker  from '@mui/lab/DatePicker';

export default function DatePick(props){
    const {name, label, value, onChange} = props;
    const convertToDefEventPara = (name, value) =>({
        target: {name, value}
    })

    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
            label={label}
            value={value}
            onChange={date => onChange(convertToDefEventPara(name, date))}
            renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
)
}
