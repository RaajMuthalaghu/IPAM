import XLSX from 'xlsx';
import React, { useState, useEffect, useMemo, useRef } from "react";
import { InputAdornment, Paper, Table, TableBody, TableCell, TableRow, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NetworkDataService from "../services/network.service";
import IPDataService from "../services/ip.service";

import { Link } from "react-router-dom";

import NetworkForm from './NetworkForm';
import PageHeader from '../components/PageHeader';
import useTable from '../components/useTable';
import Controls from '../components/controls/Controls';
import Popup from '../components/Popup';
import Notification from '../components/Notification';
import ConfirmDialog from '../components/ConfirmDialog';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
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
  {id:'vlan', label:'VLAN'},
  {id:'subnet', label:'Subnet'},
  {id:'netmask', label:'Netmask',disableSorting:true},
  {id:'gateway', label:'Gateway',disableSorting:true},
  {id:'fromip', label:'From IP',disableSorting:true},
  {id:'toip', label:'To IP',disableSorting:true},
]

const NetworksList = (props) => {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
  const [confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:''})
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, headCells, filterFn);


//initialize form using useEffect  
  useEffect(() => { retrieveNetworks(); }, []);

  const retrieveNetworks = () => {
    NetworkDataService.getAll()
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
                return items.filter(x => x.network.toLowerCase().includes(target.value.toLowerCase()))
        }
    })
}
const addOrEdit = (isedit,item, resetForm, ips) => {
    if (!isedit){
        var ipdata =[];
        NetworkDataService.create(item)
        ips.forEach( element => { ipdata.push({network: item.network, ip: element}) });
        console.log("ipdata: ",ipdata)
        IPDataService
          .create(ipdata)
          .then(response => { console.log(response.data);})
          .catch(e => { console.log(e); });
    
    }
    else  
        NetworkDataService.update(item.network, item)
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
    NetworkDataService.getAll()
    .then((response) => { setRecords(response.data); })
    .catch((e) => { console.log(e); });
    setNotify({isOpen:true, message:'Submitted Successfully', type:'success'})
}
const openInPopup = item =>{
    setRecordForEdit(item)
    setOpenPopup(true)
}
const onDelete = network => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen:false
    })
    NetworkDataService.delete(network);
    retrieveNetworks()
    setNotify({isOpen:true, message:'Deleted Successfully', type:'error'})
}
const downloadExcel = () =>{
  const workBook=XLSX.utils.book_new()
  const workSheet=XLSX.utils.json_to_sheet(records)
  XLSX.utils.book_append_sheet(workBook, workSheet, "IPAM UserList")
  //create buffer for bulk data
  let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
  //Binary string creation
  XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
  //Download
  XLSX.writeFile(workBook,"IPAMUsers.xlsx")
}

  
  return (
    <>
        <PageHeader
            title="IPAM Networks"
            subTitle="IPAM networks Form with validation"
            icon={<SettingsInputCompositeIcon fontSize="large" />}
        />
        <Paper className={classes.pageContent}>
            <Toolbar>
                <Controls.Input size="small"
                    label="Search Networks"
                    className={classes.searchInput}
                        InputProps = {{
                            startAdornment: (<InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>)
                        }}
                         onChange={handleSearch}
                />
                <Controls.Button size="small"
                text = "Add New"
                variant = "outlined"
                size = 'medium'
                className={classes.newButton}
                startIcon = {<AddIcon />}
                onClick={() => {setOpenPopup(true); setRecordForEdit(null);}}
                />
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
                            (<TableRow key={item.network}>
                                <TableCell>{item.network}</TableCell>
                                <TableCell>{item.vlan}</TableCell>
                                <TableCell>{item.subnet}</TableCell>
                                <TableCell>{item.netmask}</TableCell>
                                <TableCell>{item.gateway}</TableCell>
                                <TableCell>{item.fromip}</TableCell>
                                <TableCell>{item.toip}</TableCell>
                                <TableCell>
                                <Tooltip title="Open IP Records">
                                    <Controls.ActionButton
                                    color="primary" 
                                    // onClick={()=>{openInPopup(item)}}
                                     onClick={(e) => { e.preventDefault(); window.location.href="/ips/" + item.network; }}
                                    >
                                        <FolderOpenIcon fontSize="small" />
                                    </Controls.ActionButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Controls.ActionButton 
                                    color="secondary"
                                    onClick={() => {
                                          setConfirmDialog({
                                              isOpen:true,
                                              title:'Are you sure to delete this record?',
                                              subTitle:'you cannot undo this opertion',
                                              onConfirm: () => {onDelete(item.network)}
                                            })  
                                        }}
                                        >
                                        <CloseIcon fontSize="small"/>
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>))
                    }
                </TableBody>
            </TblContainer>
            <TblPagination />
        </Paper>
        <Popup
        title = "IPAM Network Form"
        openPopup ={openPopup}
        setOpenPopup={setOpenPopup}
        >
            <NetworkForm 
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

export default NetworksList;

