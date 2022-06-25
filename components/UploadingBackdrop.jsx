import React from 'react';
import { Backdrop, CircularProgress, Typography } from '@mui/material';

const UploadingBackdrop = ({ isSubmitting }) => {
  return (
    <Backdrop sx={{ color: '#fff', display: 'flex', flexDirection: 'column', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isSubmitting}>
        <Typography variant="h5" fontWeight={500} textAlign="center" mb={2}>Uploading Form</Typography>
        <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default UploadingBackdrop