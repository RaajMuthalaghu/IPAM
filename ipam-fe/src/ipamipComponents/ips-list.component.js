import XLSX from 'xlsx';
import React, { useState, useEffect, useMemo, useRef } from "react";
import { InputAdornment, Paper, Table, TableBody, TableCell, TableRow, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import IPDataService from "../services/ip.service";

import { Link } from "react-router-dom";

import IPForm from './IPForm';
import PageHeader from '../components/PageHeader';
import useTable from '../components/useTable';
import Controls from '../components/controls/Controls';
import Popup from '../components/Popup';
import Notification from '../components/Notification';
import ConfirmDialog from '../components/ConfirmDialog';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles(theme => ({
  pageContent: {
          size: "small",
          padding: theme.spacing(1),
          margin: theme.spacing(5)
  },
  searchInput:{
    width:'60%'
  },
  newButton:{
      position:'absolute',
      right:'-100px'
  },
  tHeader:{
    width: '120%'
  }
}))

const headCells =[
  {id:'network', label:'Network'},
  {id:'ip', label:'IP'},
  {id:'exclude', label:'Exclude'},
  {id:'hostname', label:'Hostname'},
]

const IPList = (props) => {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
  const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:''})
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, headCells, filterFn);


//initialize form using useEffect  
  useEffect(() => { retrieveIPS(props.match.params.network); }, [props.match.params.network]);

  const retrieveIPS = (network) => {
    IPDataService.get(network)
      .then((response) => { setRecords(response.data); })
      .catch((e) => { console.log(e); });
  };

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value == "")
                return items;
            else
                return items.filter(x => x.ip.toLowerCase().includes(target.value.toLowerCase()))
        }
    })
}
const addOrEdit = (isedit,item, resetForm) => {
    if (!isedit)
        IPDataService.create(item)
    else  
        IPDataService.update(item.ip, item)
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
    IPDataService.get(item.network)
    .then((response) => { setRecords(response.data); })
    .catch((e) => { console.log(e); });
    setNotify({isOpen:true, message:'Submitted Successfully', type:'success'})
}
const openInPopup = item =>{
    setRecordForEdit(item)
    setOpenPopup(true)
}
const onDelete = ip => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen:false
    })
    IPDataService.delete(ip);
    retrieveIPS()
    setNotify({isOpen:true, message:'Deleted Successfully', type:'error'})
}
const downloadExcel = () =>{
  const workBook=XLSX.utils.book_new()
  const workSheet=XLSX.utils.json_to_sheet(records)
  XLSX.utils.book_append_sheet(workBook, workSheet, "IPAM IPList")
  //create buffer for bulk data
  let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
  //Binary string creation
  XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
  //Download
  XLSX.writeFile(workBook,"IPAMIPS.xlsx")
}

  
  return (
    <>
        <PageHeader
            title="IPAM IP List"
            subTitle="IPAM IP List Form with validation"
            icon={<FormatListBulletedIcon fontSize="large" />}
        />
        <Paper className={classes.pageContent}>
            <Toolbar>
                <Controls.Input size="small"
                    label="Search IPs"
                    className={classes.searchInput}
                        InputProps = {{
                            startAdornment: (<InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>)
                        }}
                         onChange={handleSearch}
                />
                {/* <Controls.Button size="small"
                text = "Add New"
                variant = "outlined"
                size = 'medium'
                className={classes.newButton}
                startIcon = {<AddIcon />}
                onClick={() => {setOpenPopup(true); setRecordForEdit(null);}}
                /> */}
                <Tooltip title="Export Table">
                  <Controls.Button size="small"
                  // text = "Print"
                  variant = "outlined"
                  size = 'medium'
                  className={classes.newButton}
                  startIcon = {<PrintIcon />}
                  onClick={() => downloadExcel()}
                  />
                </Tooltip>
            </Toolbar>
            <TblContainer>
                <TblHead/>
                <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item =>
                            (<TableRow key={item.ip}>
                                <TableCell>{item.network}</TableCell>
                                <TableCell>{item.ip}</TableCell>
                                <TableCell>{item.exclude ? "Yes" : "No"}</TableCell>
                                <TableCell>{item.hostname}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                    color="primary" 
                                    onClick={()=>{openInPopup(item)}}
                                    >
                                        <EditOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton>
                                </TableCell>
                                {/* <TableCell>
                                    <Controls.ActionButton 
                                    color="secondary"
                                    onClick={() => {
                                          setConfirmDialog({
                                              isOpen:true,
                                              title:'Are you sure to delete this record?',
                                              subTitle:'you cannot undo this opertion',
                                              onConfirm: () => {onDelete(item.ip)}
                                            })  
                                        }}
                                        >
                                        <CloseIcon fontSize="small"/>
                                    </Controls.ActionButton>
                                </TableCell> */}
                            </TableRow>))
                    }
                </TableBody>
            </TblContainer>
            <TblPagination />
        </Paper>
        <Popup
        title = "IPAM IP List Form"
        openPopup ={openPopup}
        setOpenPopup={setOpenPopup}
        >
            <IPForm 
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit}/>
        </Popup>
        <Notification 
            notify={notify}
            setNotify={setNotify}
        />
        <ConfirmDialog 
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        />
    </>
  );
};

export default IPList;

