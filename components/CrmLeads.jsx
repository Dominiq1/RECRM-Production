
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Button, Container, Stack, Typography, Box, Snackbar , Alert} from '@mui/material';

import { useQuery, useSubscription } from '@apollo/client';
import { useDemoData } from '@mui/x-data-grid-generator';
import { useState, useMemo } from 'react';
import { GET_LEADS, NEW_LEAD_SUBSCRIPTION } from '../queries/leadQueries';

import AddLeadModal from '../components/modals/AddLead';

import AddCategoryModal from '../components/modals/AddCategory';

import AddTagModal from '../components/modals/AddTag';

import UsersActions from '../components/UsersActions';
import AddNoteButton from '../components/modals/AddNoteButton'
import AddCSVLeadModal from '../components/modals/AddCSVLeadModal';
// @mui
import CategoryGrid from '../components/inputs/CategorySearchBox';
// components
import Iconify from '@iconify/react';

import DataGridProCSV from '../components/dataGrid/DataGridProDash';
// ----------------------------------------------------------------------
import UserModal from '../components/modals/UserModal';
import LeadBox from '../components/inputs/SearchLead';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {

  const [open, setOpen] = React.useState(false);

  const [categories, setCategories] = useState([]);

  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
    const [pageSize , setpageSize] = useState(5);
    const [rowId, setRowId ]= useState(null)


    const remoteCategories = (categories) => {

    
      setCategories(categories);
      console.log('Remote categories!');
      console.log(categories);

      //  e.g: [New, Old, Test]
      //   SET CATEGORIES TO 

    }

    useSubscription(NEW_LEAD_SUBSCRIPTION, {
      onSubscriptionData: ({ subscriptionData }) => {
        const { newLead } = subscriptionData.data;
        setUsers((prevUsers) => [...prevUsers, newLead]);
      },
    });
 

  const { loading, error, data } = useQuery(GET_LEADS);

  // const { data } = useDemoData({
  //   dataSet: 'Employee',
  //   rowLength: 100000,
  //   editable: true,
  // });

  const rows = [
    
  ];

const handleLeadChange = (lead) => {
  console.log(lead);
};



const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};




  React.useEffect(() => {

 if(data){
      console.log(data);
  const { leads } = data;
  setUsers(leads);

 }else{
    setUsers([]);
 }

   
   
    
  }, [ data ])

  
  const handleClick = () => {
    setOpen(true);
  };


        const columns = useMemo(
          () => [
            {field: 'id', headerName: 'ID', width: 70,  editable: true},
            {field: 'LastName', headerName: 'Last Name', width: 70,  editable: true},
            {field: 'FirstName', headerName: 'First', width: 70,  editable: true},
            {field: 'Description', headerName: 'Last Name', width: 70,  editable: true},
            {field: 'Address', headerName: 'First', width: 70,  editable: true},
            {field: 'Actions', headerName: 'actions', width: 130, renderCell: (params) =>  <UsersActions{...{params, rowId, setRowId}}/>},
         
       ], [rowId])



  return (
    <Box  className="relative flex-1 overflow-hidden bg-white dark:bg-[#343541]" >
      {/* <Helmet>
        <title> Leads </title>
      </Helmet> */}

      <Container className="relative flex-1 overflow-hidden bg-white dark:bg-[#343541]" >


      <Stack sx={{display: 'flex', flexDirection: 'row', marginTop: '20px'}}> 
<AddLeadModal/>   

{/* // TODO PUT BACK */}
            {/* <AddCSVLeadModal/> */}
            <AddTagModal/>
            <AddCategoryModal/>
</Stack>

<Stack sx={{marginTop: '1em'}}>


<CategoryGrid remote={remoteCategories}/>

</Stack>


        {/* <Stack sx={{marginTop: '0px'}} direction="row" alignItems="center" justifyContent="space-between" mb={5}> */}
            {/* <Typography variant="h4" gutterBottom>
              Tags 
            </Typography> */}

     
            {/* <AddNoteButton/> */}
            {/* <UserModal/> */}

            {/* <Grid item xs={12} sx={{ height: 100 , display: 'flex', justifyContent: 'left', alignContent: 'center'}}>
          <TagBox  setLead={handleLeadChange} />
          </Grid> */}
              {/* </Stack> */}



              <Stack sx={{marginTop: '0px'}} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
       

     
            {/* <AddNoteButton/> */}
            {/* <UserModal/> */}

            {/* <Grid item xs={12} sx={{ height: 100 , display: 'flex', justifyContent: 'left', alignContent: 'center'}}>
          <LeadBox  setLead={handleLeadChange} />
          </Grid> */}
              </Stack>

          <Box sx={{  width: '100%', height: 'fit-content'}}>

          <DataGridProCSV  successCheck={handleClick}  Categories={categories} onRowSelectionChange={(selectedRows) => setSelectedRows(selectedRows)} 
          UserData={users}/>
          </Box>


          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '90vw', backgroundColor: 'green', color: 'white' }}>
          Updated Lead!
        </Alert>
      </Snackbar>

      </Container>
    </Box>
  );
}
