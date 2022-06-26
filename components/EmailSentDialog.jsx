import React from 'react';
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';

const EmailSentDialog = ({ title, content, isOpen, handleOnClose }) => {
  return (
    <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" 
                     sx={{ display: 'flex', justifyContent: 'space-between', background: '#226fc8', color: '#ffffff' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailIcon/>
            <Typography variant="h5" fontWeight={400} ml={2}>{title}</Typography>
          </Box>
          <Box>
            <IconButton aria-label="delete" onClick={handleOnClose} sx={{ color: '#ffffff' }}>
                <CloseIcon/>
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText component={'div'} id="alert-dialog-description" mt={3}>
            <div dangerouslySetInnerHTML={{__html: content}}></div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
  )
}

export default EmailSentDialog