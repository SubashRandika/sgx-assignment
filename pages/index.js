import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import AddIcon from '@mui/icons-material/Add';
import { validateForm } from "../validators/formValidations";

export default function Home() {

  const initialFormValues = {
    firstName: '',
    lastName: '',
    description: '',
    email: '',
    images: []
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('setSubmitting: ', setSubmitting);
    console.log('values: ', values);
  }

  const isSaveButtonDisabled = (errors, touched) => {
    return Object.keys(touched).length === 0 || Object.keys(errors).length !== 0;
  }

  return (
    <Container maxWidth="lg">
      <Card sx={{ padding: '30px 25px' }}>
        <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>Simple Form</Typography>
        <Formik initialValues={initialFormValues} validate={validateForm} onSubmit={handleSubmit}>
          {({values, submitForm, resetForm, isSubmitting, touched, errors}) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Field component={TextField} name="firstName" label="Fisrt Name" type="text" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <Field component={TextField} name="lastName" label="Last Name" type="text" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} mt={3}>
                  <Field component={TextField} name="description" label="Small Description" type="text" multiline rows={4} fullWidth />
                </Grid>
                <Grid item xs={12} mt={3}>
                  <Field component={TextField} name="email" label="Email Address" type="email" fullWidth />
                </Grid>
              </Grid>
              <Box display='flex' mt={6} justifyContent="flex-end">
                <Button startIcon={<AddIcon />}>Add Image</Button>
                <Button variant="contained" sx={{ marginLeft: '20px' }} disabled={isSaveButtonDisabled(errors, touched)}>Save</Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  )
}
