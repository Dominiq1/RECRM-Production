
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






  const LeadBox = ({ tags, selectedTags, handleTagsChange }) => {
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
    
    LeadBox.propTypes = {
    tags: PropTypes.array.isRequired,
    selectedTags: PropTypes.array.isRequired,
    handleTagsChange: PropTypes.func.isRequired,
    };
    
    export default LeadBox;




