import React, { useEffect } from 'react';
import { Grid } from '@mui/material';

import {useForm, Form} from '../components/useForm';
import {Controls} from '../components/controls/Controls';
import * as userService from '../services/user.service';
import { PhoneEnabled } from '@mui/icons-material';

const initialFValues ={
    username:'',
    password:'',
    admintype:false,
}

const genderItems =[
    {id:"true", title:"Admin User"},
    {id:"false", title:"Local User"},
]

export default function UserForm(props){
    const {addOrEdit, recordForEdit } = props;
    const editDisabled = recordForEdit ? true : false;
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('password' in fieldValues){
            temp.password = fieldValues.password ? "" : "This field is required."
            temp.password = fieldValues.password.length > 3 ? "" : "Minimum 4 numbers required."
        }
        setErrors({
            ...temp
        })
        
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
    const {values, setValues, errors, setErrors, handleInputChange, resetForm} = useForm(initialFValues,true, validate);

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
            label="User Name"
            name="username"
            value={values.username}
            disabled={editDisabled}
            onChange={handleInputChange}
            error={errors.username} 
            />
            <Controls.Input
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password} 
            />
        </Grid>
        <Grid item xs={6}>
             <Controls.Checkbox
            label="Admin Type"
            name="admintype"
            value={values.admintype}
            onChange={handleInputChange}
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
          {/*  <Controls.RadioGroup
            label="Gender"
            name="gender"
            value={values.gender}
            onChange={handleInputChange}
            items ={genderItems}
            />
             <Controls.Select
            label="Department"
            name="departmentId"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId} 
            />
             <Controls.DatePick
            label="Hire Date"
            name="hireDate"
            value={values.hireDate}
            onChange={handleInputChange}
            />
             <Controls.Checkbox
            label="Is Permanent"
            name="isPermanent"
            value={values.isPermanent}
            onChange={handleInputChange}
            /> */}
        </Grid>

    </Grid>
    </Form>
    )
}