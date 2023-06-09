

import * as React from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem , TextField, Typography, Drawer  } from '@mui/material';
import { useQuery ,useMutation} from '@apollo/client';
import { useMemo,useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import moment from 'moment';
import { useDemoData } from '@mui/x-data-grid-generator';
import UsersActions from '../UsersActions';
import styles from './Datagrid.module.css';
import CellBox from '../CellBox';
import { GET_CLIENTS } from '../../queries/clientQueres';
import { GET_LEADS } from '../../queries/leadQueries';
import ProfileDetailsPage from '../ProfileDetailsPage';
import { updateLeadMutation } from '../../mutations/leadMutations';
import { SEND_EMAILS_MUTATION } from '../../mutations/bulkEmail';
import EditCellBox from '../CellBoxes/EdtableCellBox';
import EmailActionModal from '../modals/EmalActionModal';
import AddNote from '../modals/AddNote';
import AddeAlert from '../modals/AddeAlert';
import ProfileP from '../Profile/ProfileP';



export default function DataGridProCSV(props) {

  const [tags, setTags] = useState([]);


  const [columnSetting, setColumnSeting] = useState([
    { 0: 'true', 1: 'false', 2: 'false' },

  ]);

 
  

  const [selectedColumns, setSelectedColumns] = useState([
    'id',
    'firstName',
    'email',
    'lastName',
    'Profile',
    'OriginalSource',
    'phone',
    'phoneStatus',
    'emailInvalid',
    'GloballyOptedOutOfEmail',
    'OriginalSource',
    'BuyerAgent',
    'GloballyoptedOutOfBuyerAgentEmail',
    'GloballyoptedOutOfListingAgentEmail',
    'GloballyoptedOutOfLenderEmail',
    'GloballyoptedOutOfAlerts',
    'OptInDate',
    'BuyerAgentCategory',
    'ListingAgentCategory',
    'LenderCategory',
    'BuyerAgent',
    'ListingAgent',
    'Lender',
    'tags',
    'OriginalCampaign',
    'LastAgentNote',
    'eAlerts',
    'VisitTotal',
    'listingviewcount',
    'AvgListingPrice',
    'NextCallDue',
    'LastAgentCallDate',
    'LastLenderCallDate',
    'FirstVisitDate',
    'LastVisitDate',
    'RegisterDate',
    'LeadType',
    'AgentSelected',
    'LenderOptIn',
    'Address',
    'City',
    'tags',
    'categories',
    'State',
    'Zip',
    'Link',
    'Birthday',
    'HomeClosingDate',
  

  ]);




  const [gridRef, setGridRef] = useState({});

  const [sendEmails, { loading: Emailsloading, error: Emailerror, data: emaildata }] = useMutation(
    SEND_EMAILS_MUTATION
  );
  const [rowSelectedUsers, setRowSelectedUsers] = useState([
    'dominiqmartinez13@gmail.com',
    'unhashlabs@gmail.com',
  ]);
  const [responseData, setResponseData] = useState([]);

  const { loading: graphQLClientsLoading, error: graphQLClientsError, data } = useQuery(GET_LEADS);
  
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');



  const handleCellEditStart = (params) => {
    console.log('Cell edit started:', params);
   // alert(`Cell edit started: row ${params.id}, field ${params.field}`);
  };


  const handleCellEditCommit = (params, getRow) => {
  console.log('Cell edit commited:', params);
  };
  
  
  const rows = [
   
  ];

  const handleSendEmails = async (Emails, Subject, Body) => {
    try {
      const { data } = await sendEmails({
        variables: {
          emails: Emails,
          subject: Subject,
          body: Body,
        },
      });
      console.log(data); // do something with the returned data
    } catch (e) {
      console.error(e); // handle errors
    }
  };


  const apiRef = React.useRef(null);

  const handleRowSelection = (params) => {
    const selectedEmails = params.map((id) => {
      const row = responseData.find((r) => r.id === id);
      return row.email;
    });
    setRowSelectedUsers(selectedEmails);
  };

  useEffect(() => {

   
    if(props.UserData){ 
      // console.log(props.UserData)
      
 
    const usersWithIds = props.UserData.map((user, index) => {

      const Tags = user.tags.map((item, index) => {
        return item.title;
      });
      
      const Categories = user.categories.map((item, index) => {
        return item.title;
      });



      const OGTags = user.tags.map((item, index) => {
        return item.id;
      });
      
      const OGCategories = user.categories.map((item, index) => {
        return item.id;
      });

      console.log(Categories)
      console.log(Tags)


// alert("user!")



      return { ...user, Uid: index, tags: Tags, categories: Categories, ogTags: OGTags, ogCategories: OGCategories};
    });



    setResponseData(usersWithIds)

}
  }, [ props.UserData , data]);


  const columns = useMemo(
    () => [
      {field: 'Profile', headerName: 'Profile', width: 150,  editable: true, renderCell: (params) =>  <ProfileDetailsPage row={params.row.Uid} {...{params }}/>},
      { field: 'id', headerName: 'ID', width: 250, editable: true, hide: true },
      { field: 'firstName', headerName: 'First Name', width: 180, editable: true, type: 'text'  , renderCell: (params) => 
      
      <Box sx={ { width: '100%', height: '100%' ,borderTop: 'none', 
      borderBottom: 'none', 
      borderLeft: '1px solid lightgray', 
      borderRight:  'none',
      overflow: 'hidden', }}> 
      <CellBox successCheck={props.successCheck} item={1} {...{params, rowId, setRowId }}/>

      </Box>
    
    },
      { field: 'lastName', headerName: 'last Name', width: 180, editable: true , renderCell: (params) => 
      <Box sx={ { width: '100%', height: '100%' ,borderTop: 'none', 
      borderBottom: 'none', 
      borderLeft: '1px solid lightgray', 
      borderRight:  'none',
      overflow: 'hidden', }}> 
      
      <CellBox item={2} {...{params, rowId, setRowId }}/>
      </Box>
      
      , hide: true },
      { field: 'email', headerName: 'email', width: 250, editable: true, renderCell: (params) => 
      
      <Box sx={ { width: '100%', height: '100%' ,borderTop: 'none', 
      borderBottom: 'none', 
      borderLeft: '1px solid lightgray', 
      borderRight:  'none',
      overflow: 'hidden',
      
      }}> 
      
      <CellBox item={3} {...{params, rowId, setRowId }}/> 

      </Box>
      
      },
      { field: 'phone', headerName: 'phone', width: 180, editable: true, renderCell: (params) => 
      
      <Box sx={ { width: '100%', height: '100%' ,borderTop: 'none', 
      borderBottom: 'none', 
      borderLeft: '1px solid lightgray', 
      borderRight:  'none', }}> 
      
      <CellBox item={4} {...{params, rowId, setRowId }}/> 

      </Box>
      
      , hide: true},
      { field: 'phoneStatus', headerName: 'phoneStatus', width: 120, editable: true , renderCell: (params) =>  <CellBox item={5} {...{params, rowId, setRowId }}/>, hide: true},
      { field: 'emailInvalid', headerName: 'emailInvalid', width: 120, editable: true, renderCell: (params) =>  <CellBox item={6} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'GloballyOptedOutOfEmail', headerName: 'GloballyOptedOutOfEmail', width: 120, editable: true, renderCell: (params) =>  <CellBox item={7} {...{params, rowId, setRowId }}/>, hide: true  },
      { field: 'GloballyOptedOutOfBuyerAgentEmail', headerName: 'GloballyOptedOutOfBuyerAgentEmail', width: 120, editable: true, renderCell: (params) =>  <CellBox item={8} {...{params, rowId, setRowId }}/>, hide: true  },
      { field: 'GloballyOptedOutOfListingAgentEmail', headerName: 'GloballyOptedOutOfListingAgentEmail', width: 120, editable: true, renderCell: (params) =>  <CellBox item={9} {...{params, rowId, setRowId }}/> , hide: true },
      { field: 'GloballyOptedOutOfLenderEmail', headerName: 'GloballyOptedOutOfLenderEmail', width: 120, editable: true , renderCell: (params) =>  <CellBox item={10} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'GloballyOptedOutOfAlerts', headerName: 'GloballyOptedOutOfAlerts', width: 120, editable: true, renderCell: (params) =>  <CellBox item={11} {...{params, rowId, setRowId }}/>, hide: true  },
      { field: 'OptInDate', headerName: 'OptInDate', width: 120, editable: true, renderCell: (params) =>  <CellBox item={12} {...{params, rowId, setRowId }}/> , hide: true },
      { field: 'BuyerAgentCategory', headerName: 'BuyerAgentCategory', width: 120, editable: true, renderCell: (params) =>  <CellBox item={13} {...{params, rowId, setRowId }}/>, hide: true  },
      { field: 'ListingAgentCategory', headerName: 'ListingAgentCategory', width: 120, editable: true , renderCell: (params) =>  <CellBox item={14} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'LenderCategory', headerName: 'LenderCategory', width: 120, editable: true , renderCell: (params) =>  <CellBox item={15} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'BuyerAgent', headerName: 'BuyerAgent', width: 120, editable: true , renderCell: (params) =>  <CellBox item={16} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'ListingAgent', headerName: 'ListingAgent', width: 120, editable: true, renderCell: (params) =>  <CellBox item={17} {...{params, rowId, setRowId }}/> , hide: true },
      { field: 'Lender', headerName: 'Lender', width: 120, editable: true, renderCell: (params) =>  <CellBox item={18} {...{params, rowId, setRowId }}/>, hide: true  },
      { field: 'OriginalSource', headerName: 'OriginalSource', width: 120, editable: true , renderCell: (params) =>  <CellBox item={19} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'OriginalCampaign', headerName: 'OriginalCampaign', width: 120, editable: true , renderCell: (params) =>  <CellBox item={20} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'LastAgentNote', headerName: 'LastAgentNote', width: 120, editable: true, renderCell: (params) =>  <CellBox item={21} {...{params, rowId, setRowId }}/>, hide: true  },
      { field: 'eAlerts', headerName: 'eAlerts', width: 120, editable: true , renderCell: (params) =>  <CellBox item={22} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'VisitTotal', headerName: 'VisitTotal', width: 120, editable: true, renderCell: (params) =>  <CellBox item={23} {...{params, rowId, setRowId }}/> , hide: true },
      { field: 'listingviewcount', headerName: 'listingviewcount', width: 120, editable: true , renderCell: (params) =>  <CellBox item={24} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'AvgListingPrive', headerName: 'AvgListingPrive', width: 120, editable: true , renderCell: (params) =>  <CellBox item={25} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'NextCallDue', headerName: 'NextCallDue', width: 120, editable: true , renderCell: (params) =>  <CellBox item={26} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'LastAgentCalDate', headerName: 'LastAgentCalDate', width: 120, editable: true , renderCell: (params) =>  <CellBox item={27} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'LastLenderCallDate', headerName: 'LastLenderCallDate', width: 120, editable: true , renderCell: (params) =>  <CellBox item={28} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'FirstVisitDate', headerName: 'FirstVisitDate', width: 120, editable: true , renderCell: (params) =>  <CellBox item={29} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'LastVisitDate', headerName: 'LastVisitDate', width: 120, editable: true , renderCell: (params) =>  <CellBox item={30} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'RegisterDate', headerName: 'RegisterDate', width: 120, editable: true , renderCell: (params) =>  <CellBox item={31} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'LeadType', headerName: 'LeadType', width: 120, editable: true , renderCell: (params) =>  <CellBox item={32} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'AgentSelected', headerName: 'AgentSelected', width: 120, editable: true , renderCell: (params) =>  <CellBox item={33} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'LenderOptIn', headerName: 'LenderOptIn', width: 120, editable: true , renderCell: (params) =>  <CellBox item={34} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'Address', headerName: 'Address', width: 120, editable: true , renderCell: (params) =>  <CellBox item={35} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'City', headerName: 'City', width: 120, editable: true, renderCell: (params) =>  <CellBox item={36} {...{params, rowId, setRowId }}/>, hide: true  },
      { field: 'State', headerName: 'State', width: 120, editable: true , renderCell: (params) =>  <CellBox item={37} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'ZipCode', headerName: 'Lender', width: 120, editable: true, renderCell: (params) =>  <CellBox item={38} {...{params, rowId, setRowId }}/> , hide: true },
      { field: 'Link', headerName: 'Link', width: 120, editable: true, renderCell: (params) =>  <CellBox item={39} {...{params, rowId, setRowId }}/> , hide: true },
      { field: 'Birthday', headerName: 'Birthday', width: 120, editable: true, renderCell: (params) =>  <CellBox item={40} {...{params, rowId, setRowId }}/> , hide: true },
      { field: 'HomeClosingDate', headerName: 'HomeClosingDate', width: 120, editable: true, renderCell: (params) => 

      <Box sx={ { width: '100%', height: '100%' ,borderTop: 'none', 
      borderBottom: 'none', 
      borderLeft: '1px solid lightgray', 
      borderRight:  'none', }}> 
       <CellBox item={41} {...{params, rowId, setRowId }}/> 

        </Box>

       
       
       , hide: true },
      { field: 'tags', headerName: 'tags', width: 270, editable: true, renderCell: (params) =>  <Box sx={ { width: '100%', height: '100%' ,borderTop: 'none', 
      borderBottom: 'none', 
      borderLeft: '1px solid lightgray', 
      borderRight:  'none', }}> 
      
      <CellBox  item={42} {...{params, rowId, setRowId }}/> 

      </Box>
      
      
      
      },
      { field: 'categories', headerName: 'categories', width: 270, editable: true, renderCell: (params) =>  <Box sx={ { width: '100%', height: '100%' ,borderTop: 'none', 
      borderBottom: 'none', 
      borderLeft: '1px solid lightgray', 
      borderRight:  '1px solid black', }}> 
        
        
         <CellBox item={43} {...{params, rowId, setRowId }}/>

         </Box>
         
         
          },
      { field: 'Uid', headerName: 'UID', width: 100, editable: true, hide: true },
      ],
      [rowId]
      );
      
      const handlePageSizeChange = (params) => {
      setPageSize(params.pageSize);
      };
      
      const handleEditRowsModelChange = (params) => {
      const updatedData = [...responseData];
      params.forEach((cell) => {
      const { field, id, value } = cell;
      const row = updatedData.find((r) => r.id === id);
      row[field] = value;
      });



      setResponseData(updatedData);
      };
      
      const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
      };
      
      const [filteredData, setFilteredData] = useState([]);

      useEffect(() => {
        const filteredRows = responseData.filter((row) => {
          const matched = Object.values(row).some((value) => {
            return String(value).toLowerCase().includes(searchQuery.toLowerCase());
          });
      
          const categoryMatched =
            props.Categories.length === 0 ||
            props.Categories.some((category) => {
              return row.categories.includes(category);
            });
      
          return matched && categoryMatched;
        });
      
        setFilteredData(filteredRows);
      }, [responseData, searchQuery, props.Categories]);
      
      // ...
      
      <DataGridPro
        rows={filteredData}
        // ...
      />
      




    

    return (
    <div style={{ height: 600, width: '100%', backgroundColor: 'white' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <Typography variant="h6" style={{ marginRight: 16 }}>
    User Fields
    </Typography>
    <TextField
    variant="outlined"
    label="Search"
    value={searchQuery}
    onChange={handleSearchInputChange}
    style={{ marginRight: 16 }}
    />
    <Button variant="outlined" style={{ marginRight: 16 }}>
    Export
    </Button>
    <Button
    variant="outlined"
    style={{ marginRight: 16 }}
    disabled={rowSelectedUsers.length === 0}
    onClick={() =>
    handleSendEmails(rowSelectedUsers, 'Test Subject', 'This is a test email body')
    }
    >
    Send Email
    </Button>
    <Typography variant="h6" style={{ marginLeft: 'auto', marginRight: 16 }}>
    Rows per page:
    </Typography>
    <TextField
    select
    value={pageSize}
    onChange={(e) => setPageSize(Number(e.target.value))}
    variant="outlined"
    style={{ width: 80 }}
    >
    {[5, 10, 25].map((size) => (
    <MenuItem key={size} value={size}>
    {size}
    </MenuItem>
    ))}
    </TextField>
    </div>
    <div style={{ height: 540, width: '100%' }}>


      {/* DATA GRID PRO  */}
    <DataGridPro
  rows={filteredData}
  columns={columns.filter((column) => selectedColumns.includes(column.field))}
  pageSize={pageSize}
 disableVirtualization
 rowHeight={100}
  rowsPerPageOptions={[10]}
  checkboxSelection
  disableSelectionOnClick
    apiRef={apiRef}
  onSelectionModelChange={handleRowSelection}
  onPageSizeChange={handlePageSizeChange}
  // onCellEditCommit={(params) => setRowId(params.id)}
  onCellEditCommit={handleCellEditCommit} // Add this line
  onCellEditStart={handleCellEditStart} // Add this line
  components={{ Toolbar: GridToolbar }}
  componentsProps={{
    toolbar: {
      selectedColumns,
      setSelectedColumns,
      gridRef,
      setGridRef,
   
    },
  }}




/>


    </div>

    </div>
    );
    }






