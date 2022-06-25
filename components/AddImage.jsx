import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddImage = ({ fileInputRef, onFileChange, onAddImage }) => {
  return (
    <>
        <input name="images" type="file" style={{ display: 'none' }} ref={fileInputRef} 
                       onChange={onFileChange} multiple accept="image/*"/>
        <Button startIcon={<AddIcon />} onClick={onAddImage} >Add Image</Button>
    </>
  )
}

export default AddImage