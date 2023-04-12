import React, { useEffect } from 'react';
import { Grid } from '@mui/material';

import {useForm, Form} from '../components/useForm';
import {Controls} from '../components/controls/Controls';

const initialFValues ={
    network:'',
    vlan:0,
    subnet:'',
    netmask:'',
    gateway:'',
    fromip:'',
    toip:'',
}

const ValidateSubnet = (ipsubnet) => {  
    if (Number(ipsubnet.split("/")[1])<=32){
      if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipsubnet.split("/")[0])) {  
        return (true)  
      }  
    }
    //alert("You have entered an invalid subnet address! Valid format is x.x.x.x/cidr")  
    return (false)  
} 

const subnetfill = (option, temp) => {
    var ipsubnet = temp.subnet;

    var q1=(ipsubnet.split("/")[0]).split(".")[0];
    var q2=(ipsubnet.split("/")[0]).split(".")[1];
    var q3=(ipsubnet.split("/")[0]).split(".")[2];
    var q4=(ipsubnet.split("/")[0]).split(".")[3];
    var cidr=ipsubnet.split("/")[1];

		//get IP Address binaries
		var ipBin={};
		ipBin[1]=String("00000000"+parseInt(q1,10).toString(2)).slice(-8);
		ipBin[2]=String("00000000"+parseInt(q2,10).toString(2)).slice(-8);
		ipBin[3]=String("00000000"+parseInt(q3,10).toString(2)).slice(-8);
		ipBin[4]=String("00000000"+parseInt(q4,10).toString(2)).slice(-8);

		//decide standart class
		var standartClass="";
		if(q1<=126) standartClass="A";
		else if (q1===127)	standartClass="loopback IP"
		else if (q1>=128 && q1<=191) standartClass="B";
		else if (q1>=192 && q1<=223) standartClass="C";
		else if (q1>=224 && q1<=239) standartClass="D (Multicast Address)";
		else if (q1>=240 && q1<=225) standartClass="E (Experimental)";
		else standartClass="Out of range";
    
    //netmask
    var mask=cidr;
    var importantBlock=Math.ceil(mask/8);
    var importantBlockBinary=ipBin[importantBlock];
    var maskBinaryBlockCount=mask%8;
    if(maskBinaryBlockCount===0)importantBlock++;
    var maskBinaryBlock="";
    var maskBlock="";
    for(var i=1;i<=8;i++){
      if(maskBinaryBlockCount>=i){
        maskBinaryBlock+="1";
      }else{
        maskBinaryBlock+="0";
      }
    }
    //convert binary mask block to decimal
    maskBlock=parseInt(maskBinaryBlock,2);

    //net & broadcast addr
    var netBlockBinary="";
    var bcBlockBinary="";
    for(i=1;i<=8;i++){
      if(maskBinaryBlock.substr(i-1,1)==="1"){
        netBlockBinary+=importantBlockBinary.substr(i-1,1);
        bcBlockBinary+=importantBlockBinary.substr(i-1,1);
      }else{
        netBlockBinary+="0";
        bcBlockBinary+="1";
      }
    }

    //put everything together, create a string container variables
    mask="";
    var gw="";
    var rangeA="";
    var rangeB="";
    //loop to put whole strings block together
    for(i=1;i<=4;i++){
      if(importantBlock>i) {
        //blocks before the important block.
        mask+="255";
        gw+=parseInt(ipBin[i],2);
        rangeA+=parseInt(ipBin[i],2);
        rangeB+=parseInt(ipBin[i],2);
      }else if (importantBlock===i) {

        //the important block.
        mask+=maskBlock;
        q4 =(parseInt(netBlockBinary,2)+1);
        gw+=(parseInt(netBlockBinary,2)+1);
        rangeA+=(parseInt(netBlockBinary,2)+2);
        rangeB+=(parseInt(bcBlockBinary,2)-1);
      }else {
        //block after the important block.
        mask+=0;
        gw+=0;
        rangeA+=0;
        rangeB+=255;
      }
      //add . separator except the last block
      if(i<4){
        mask+=".";
        gw+=".";
        rangeA+=".";
        rangeB+=".";
      }
    }
    temp.netmask=mask; 
    //temp.gateway=gw; temp.fromip= rangeA; temp.toip= rangeB;
    temp.gateway=q1 + "." + q2 + "." + q3 + "." + q4;

    var ips=[];
    q4+=1
    temp.fromip=q1 + "." + q2 + "." + q3 + "." + q4;
    for(let i=2**(32 - cidr)-3;i>0;i--){
        ips.push(q1 + "." + q2 + "." + q3 + "." + q4);
        q4++;
        if (q4 > 255) {
        q2++;
        q4 = 0;
        }
        if (q2 > 255) {
        q1++;
        q2 = 0;
        }
        if (q1 > 255) {
        q1++;
        q1 = 0;
        }
    }
    temp.toip=q1 + "." + q2 + "." + q3 + "." + q4;
    if(option=="getNetwork") return temp; else return ips;

}

// const iplisting = (ipsubnet) => {

//     var q1=(ipsubnet.split("/")[0]).split(".")[0];
//     var q2=(ipsubnet.split("/")[0]).split(".")[1];
//     var q3=(ipsubnet.split("/")[0]).split(".")[2];
//     var q4=(ipsubnet.split("/")[0]).split(".")[3];
//     var cidr=ipsubnet.split("/")[1];

//     //list ips q1..q4 cidr
//     var ips=[];
//     q4+=1
//     for(let i=2**(32 - cidr)-3;i>0;i--){
//         ips.push(q1 + "." + q2 + "." + q3 + "." + q4);
//         q4++;
//         if (q4 > 255) {
//         q2++;
//         q4 = 0;
//         }
//         if (q2 > 255) {
//         q1++;
//         q2 = 0;
//         }
//         if (q1 > 255) {
//         q1++;
//         q1 = 0;
//         }
//     }
//     return ips;
    
// }
export default function NetworkForm(props){
    const {addOrEdit, recordForEdit, saveIP } = props;
    const editDisabled = recordForEdit ? true : false;
    var ips=[];
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('network' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('vlan' in fieldValues)
            temp.vlan = fieldValues.vlan ? "" : "This field is required."
        if ('subnet' in fieldValues){
            temp.subnet = fieldValues.subnet ? "" : "This field is required."
            temp.subnet = ValidateSubnet(fieldValues.subnet) ? "" : "Invalid subnet address."
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
        console.log("values: ", values);
//        if (validate())
//        {
            // employeeService.insertEmployee(values)
            // resetForm()
            //ips = iplisting(values.subnet)
            ips = subnetfill("getIPS",{...values})
            console.log("ips: ", ips)
            addOrEdit(editDisabled,values,resetForm,ips);
//        }
    }

    useEffect(() =>{
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
        })
    },[recordForEdit])

    const onfillup = (e) =>{
        let temp = subnetfill("getNetwork",{...values})
        setValues(temp)
    }         

    return(
    <Form onSubmit={handleSubmit}>
    <Grid container>
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
            label="VLAN"
            name="vlan"
            value={values.vlan}
            type="integer"
            onChange={handleInputChange}
            error={errors.vlan} 
            />
            <Controls.Input
            label="Subnet"
            name="subnet"
            value={values.subnet}
            onChange={handleInputChange}
            onBlur={onfillup}
            error={errors.subnet} 
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
        <Grid item xs={6}>
            <Controls.Input
            label="NetMask"
            name="netmask"
            value={values.netmask}
            onChange={handleInputChange}
            error={errors.netmask} 
            />
            <Controls.Input
            label="Gateway"
            name="gateway"
            value={values.gateway}
            onChange={handleInputChange}
            error={errors.gateway} 
            />
            <Controls.Input
            label="FromIP"
            name="fromip"
            value={values.fromip}
            onChange={handleInputChange}
            error={errors.fromip} 
            />
            <Controls.Input
            label="ToIP"
            name="toip"
            value={values.toip}
            onChange={handleInputChange}
            error={errors.toip} 
            />
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