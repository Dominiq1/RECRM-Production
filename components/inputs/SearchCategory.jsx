
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => `
  color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
  font-size: 14px;
`);

const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')(({ theme }) => `
  width: 200px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 90;
    min-width: 90px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`);

const Tag = styled('div')(({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'};
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`);

const Listbox = styled('ul')(({ theme }) => `
  width: 500px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;
    & span {
      flex-grow: 1;
    }
    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;
    & svg {
      color: #1890ff;
    }
    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;
    & svg {
      color: currentColor;
    }
  }
`);




















  const CategoryBoxView = ({ tags, selectedTags, handleTagsChange }) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(tags);
    
    const handleChange = (event, newValue) => {
    if (newValue) {
    handleTagsChange(newValue);
    setInputValue('');
    }
    };
    
    const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue) {
    setOptions(
    tags.filter((option) =>
    option.title.toLowerCase().includes(newInputValue.toLowerCase())
    )
    );
    } else {
    setOptions(tags);
    }
    };
    
    const handleDelete = (tagToDelete) => () => {
    const newSelectedTags = selectedTags.filter((tag) => tag.title !== tagToDelete.title);
    handleTagsChange(newSelectedTags);
    };
    
    return (
    <Root>
    <Autocomplete
    multiple
    id="tags-outlined"
    options={options}
    getOptionLabel={(option) => option.title}
    filterSelectedOptions
    value={selectedTags}
    onChange={handleChange}
    onInputChange={handleInputChange}
    renderInput={(params) => (
    <InputWrapper className={params.inputProps.focused ? 'focused' : ''}>
    {selectedTags.map((tag) => (
    <Tag key={tag.title} onClick={handleDelete(tag)}>
    <span>{tag.title}</span>
    <CloseIcon fontSize="small" />
    </Tag>
    ))}
    <input {...params.inputProps} />
    </InputWrapper>
    )}
    renderOption={(props, option) => (
    <li {...props}>
    <span>{option.title}</span>
    {selectedTags.some((tag) => tag.title === option.title) ? (
    <CheckIcon fontSize="small" />
    ) : null}
    </li>
    )}
    ListboxComponent={Listbox}
    />
    </Root>
    );
    };
    
    CategoryBoxView.propTypes = {
    tags: PropTypes.array.isRequired,
    selectedTags: PropTypes.array.isRequired,
    handleTagsChange: PropTypes.func.isRequired,
    };
    
    export default CategoryBoxView;






















































































// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useAutocomplete } from '@mui/material/Autocomplete';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';
// import { autocompleteClasses } from '@mui/material/Autocomplete';
// import { useQuery, useMutation, gql } from '@apollo/client';
// import { GET_TAGS , GET_TAG} from '../../queries/tagQueries';
// import { GET_CATEGORIES } from '../../queries/categoryQueries';
// import { updateLeadMutation } from '../../mutations/leadMutations';






// const Root = styled('div')(({ theme }) => `
//   color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
//   font-size: 14px;
// `);

// const Label = styled('label')`
//   padding: 0 0 4px;
//   line-height: 1.5;
//   display: block;
// `;

// const InputWrapper = styled('div')(({ theme }) => `
//   width: 200px;
//   border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
//   background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
//   border-radius: 4px;
//   padding: 1px;
//   display: flex;
//   flex-wrap: wrap;

//   &:hover {
//     border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
//   }

//   &.focused {
//     border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
//     box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
//   }

//   & input {
//     background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
//     color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'};
//     height: 30px;
//     box-sizing: border-box;
//     padding: 4px 6px;
//     width: 90;
//     min-width: 90px;
//     flex-grow: 1;
//     border: 0;
//     margin: 0;
//     outline: 0;
//   }
// `);

// function Tag(props) {
//   const { label, onDelete, ...other } = props;
//   return (
//     <div {...other}>
//       <span>{label}</span>
//     </div>
//   );
// }

// Tag.propTypes = {
//   label: PropTypes.string.isRequired,
// };

// const StyledTag = styled(Tag)(({ theme }) => `
//   display: flex;
//   align-items: center;
//   height: 24px;
//   margin: 2px;
//   line-height: 22px;
//   background-color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'};
//   border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
//   border-radius: 2px;
//   box-sizing: content-box;
//   padding: 0 4px 0 10px;
//   outline: 0;
//   overflow: hidden;

//   & span {
//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//   }
// `);

// const Listbox = styled
// ('ul')(({ theme }) => `
// width: 500px;
// margin: 2px 0 0;
// padding: 0;
// position: absolute;
// list-style: none;
// background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
// overflow: auto;
// max-height: 250px;
// border-radius: 4px;
// box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
// z-index: 1;

// & li {
// padding: 5px 12px;
// display: flex;
// & span {
//   flex-grow: 1;
// }

// & svg {
//   color: transparent;
// }
// }

// & li[aria-selected='true'] {
// background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
// font-weight: 600;
// & svg {
//   color: #1890ff;
// }
// & svg {
//   color: #1890ff;
// }
// }

// & li.${autocompleteClasses.focused} {
// background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
// cursor: pointer;
// & svg {
//   color: currentColor;
// }
// }
// `);




// export default function SearchCategory(props) {
 
//     const [retreivedTags, setRetreivedTags] = useState([]);


//     const [usersTags, setUsersTags] = useState([{ title: "new" }]);
//     const [lead, setLead] = useState(null);

    
//     const [updateLead, { Leadloading, updateLeadError, Leaddata }] = useMutation(
//       updateLeadMutation,
//       {
//         update: (cache, { data: { updateLead } }) => {
//           cache.modify({
//             fields: {
//               leads(existingLeads = [], { readField }) {
//                 const updatedLeadRef = cache.writeFragment({
//                   data: updateLead,
//                   fragment: gql`
//                     fragment UpdatedLead on Lead {
//                       id
//                       categories {
//                         id
//                         title
//                       }
//                     }
//                   `,
//                 });
//                 const leadId = readField("id", updatedLeadRef);
//                 const leadIndex = existingLeads.findIndex((lead) => lead.id === leadId);
//                 if (leadIndex >= 0) {
//                   existingLeads[leadIndex] = updatedLeadRef;
//                 }
//                 return existingLeads;
//               },
//             },
//           });
//         },
//       }
//     );
    

//     const { loading: tagsLoading, error: tagsError, data: tagsData } = useQuery(
//       GET_CATEGORIES
//     );

      
//   // const { loading: tagsLoading, error: tagsError, data: tagsData } = useQuery(GET_TAG, {
//   //   variables: { id: selectedLead ? selectedLead.id : null },
//   //   skip: !selectedLead,
//   // });



//     const [tags, setTags] = useState(retreivedTags);
  

  
//     useEffect(() => {

    

//       if(props.Lead){
//         console.log("props.Lead");
//         setLead(props.Lead);
//         setLead(props.Lead.categories);
//         console.log(props.Lead.tags);
//         console.log(props.Lead.categories);

//         // alert("Check info here")

//         const defaultArray = []


           
      
//         if (props.Lead.categories != null){

//               if (props.Lead.categories.length > 0 && tagsData && tagsData.categories) {
//         console.log("props.tags");
//         console.log(props.Lead);

      
//         const tagsArray = props.Lead.categories.map((tag) => {
//           return tag.title;
//           }
//       )

//       console.log(tagsArray);
  
//       console.log(props);
//       //  alert("Check info here")




//       }


//         }

//       }



//     }, [tagsData, props.Lead]);
  
//     useEffect(() => {
//       if (tagsData && tagsData.categories) {
//         setRetreivedTags(tagsData.categories);
//         setTags(tagsData.categories);
//       }
//     }, [tagsData, props.Lead]);
  
//     const {
//       getRootProps,
//       getInputLabelProps,
//       getInputProps,
//       getTagProps,
//       getListboxProps,
//       getOptionProps,
//       groupedOptions,
//       value,
//       focused,
//       setAnchorEl,
//     } = useAutocomplete({
//       id: "customized-hook-demo",
//      //  defaultValue: retreivedTags,
//      defaultValue: props.defaultValues,
//       multiple: true,
//       options: tags,
//       getOptionLabel: (option) => option.title,
//       onChange: async (event, newValue) => {
//         const newTags = [];
  
//         for (let i = 0; i < newValue.length; i += 1) {
//           newTags.push(newValue[i].id);
//         }

//             const OGTags = props.Lead.tags.map((tag) => {
//               return tag.id;
              
//               });

//         //   Save new tags to user
//         try {
//           const result = await updateLead({
//             variables: {
//               id: props.Lead.id,
//               firstName: props.Lead.firstName,
//               email: props.Lead.email,
//               lastName: props.Lead.lastName,
//               Tags: OGTags,
//               Categories: newTags,
//             },
//           }).then((res) => {
   
//             props.successCheck();
//             console.log("Lead Updated");
//             console.log(res);
//           }).catch((err) => {
//             console.log(err);
//             console.log("error adding category.");
          
//           }); 
  
//           return result;
//         } catch (err) {
//           console.log(err);
//           return null;
//         }
//       },
//     });
  
//     return (
//       <Root>
//         <div {...getRootProps()}>
//           <Label {...getInputLabelProps()}>Add Categories</Label>

//           <InputWrapper ref={setAnchorEl} className={focused ? "focused"
//   : ""}>
//   {value.map((option, index) => (
//   <StyledTag label={option.title} {...getTagProps({ index })} />
//   ))}
//   <input {...getInputProps()} readOnly />
//   </InputWrapper>
//   </div>
//   {groupedOptions.length > 0 ? (

//       <Listbox {...getListboxProps()}>
//   {groupedOptions.map((option, index) => (
//   <li {...getOptionProps({ option, index })}>
//   <span>{option.title}</span>
//   <CheckIcon fontSize="small" />
//   </li>
//   ))}
//   </Listbox>
    




//   ) : null}
//   </Root>
//   );
//   }













