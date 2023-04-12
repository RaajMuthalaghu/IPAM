import React, { useEffect } from 'react';
import { Grid } from '@mui/material';

import {useForm, Form} from '../components/useForm';
import {Controls} from '../components/controls/Controls';
// import * as userService from '../services/user.service';
// import { PhoneEnabled } from '@mui/icons-material';

const initialFValues ={
    network:'',
    ip:'',
    exclude:false,
    hostname:'',
}

export default function IPForm(props){
    const {addOrEdit, recordForEdit } = props;
    const editDisabled = recordForEdit ? true : false;
    const validate = (fieldValues = values) => {
         let temp = { ...errors }
    //     if ('username' in fieldValues)
    //         temp.username = fieldValues.username ? "" : "This field is required."
    //     if ('password' in fieldValues){
    //         temp.password = fieldValues.password ? "" : "This field is required."
    //         temp.password = fieldValues.password.length > 3 ? "" : "Minimum 4 numbers required."
    //     }
    //     setErrors({
    //         ...temp
    //     })
        
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
        
    }
    const {values, setValues, errors, setErrors, handleInputChange, resetForm} = useForm(initialFValues,true,validate);

    const handleSubmit = e =>{
        e.preventDefault()
        if (validate())
        {
            // employeeService.insertEmployee(values)
            // resetForm()
            addOrEdit(editDisabled,values,resetForm);
        }
    }

    useEffect(() =>{
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
        })
    },[recordForEdit])

    return(
    <Form onSubmit={handleSubmit}>
    <Grid container>
        {console.log(recordForEdit)}
        <Grid item xs={6}>
            <Controls.Input
            label="Network"
            name="network"
            value={values.network}
            disabled={editDisabled}
            onChange={handleInputChange}
            error={errors.network} 
            />
            <Controls.Input
            label="IP"
            name="ip"
            value={values.ip}
            disabled={editDisabled}
            onChange={handleInputChange}
            error={errors.ip} 
            />
        </Grid>
        <Grid item xs={6}>
             <Controls.Checkbox
            label="Exclude"
            name="exclude"
            value={values.exclude}
            onChange={handleInputChange}
            />
            <Controls.Input
            label="Hostname"
            name="hostname"
            value={values.hostname}
            onChange={handleInputChange}
            error={errors.hostname} 
            />
            <div>
                <Controls.Button
                    type="submit"
                    text="Submit"
                />
                <Controls.Button
                    text="Reset"
                    color="warning"
                    onClick={resetForm}
                />

            </div>
        </Grid>

    </Grid>
    </Form>
    )
}