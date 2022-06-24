import { Box, Button, Card, Container, Grid, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Card sx={{ padding: '30px 25px' }}>
        <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>Simple Form</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField id="first-name" type="text" label="Fisrt Name" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField id="last-name" type="text" label="Last Name" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} mt={3}>
            <TextField id="small-description" type="text" label="Small Description" multiline rows={4} fullWidth />
          </Grid>
          <Grid item xs={12} mt={3}>
            <TextField id="email" type="email" label="Email Address" fullWidth />
          </Grid>
        </Grid>
        <Box display='flex' mt={6} justifyContent="flex-end">
          <Button startIcon={<AddIcon />}>Add Image</Button>
          <Button variant="contained" sx={{ marginLeft: '20px' }} type="submit">Save</Button>
        </Box>
      </Card>
    </Container>
  )
}
