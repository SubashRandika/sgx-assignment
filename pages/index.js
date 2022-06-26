import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { Box, Button, Card, Container, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { validateForm } from "../validators/formValidations";
import UploadingBackdrop from '../components/UploadingBackdrop'
import AddImage from "../components/AddImage";

export default function Home() {

  const hiddenFileInput = useRef(null);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const initialFormValues = {
    firstName: '',
    lastName: '',
    description: '',
    email: '',
    images: []
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {...values, images };
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log('result: ', result);
    setSubmitting(false);
  }

  const isSaveButtonDisabled = (errors, touched) => {
    return Object.keys(touched).length === 0 || Object.keys(errors).length !== 0;
  }

  const handleFileChange = (event) => {
    // @ts-ignore
    setImages([...images, event.target.files[0]]);
  }

  const handleAddImage = (event) => {
    // @ts-ignore
    hiddenFileInput.current.click();
  }

  useEffect(() => {
    if(images.length < 1) return;
    
    const newImageUrls = [];
    images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
    // @ts-ignore
    setImageURLs(newImageUrls);
  }, [images])
  

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
                <Grid item xs={12} mt={3}>
                  <ImageList cols={2}>
                    {imageURLs.map((imageSrc, index) => (
                      <ImageListItem key={index}>
                        <Image
                          src={imageSrc}
                          loading="lazy"
                          alt="image"
                          width="100%"
                          height={300}
                          objectFit="cover"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Grid>
              </Grid>
              <Box display='flex' mt={6} justifyContent="flex-end">
                <AddImage fileInputRef={hiddenFileInput} onFileChange={handleFileChange} onAddImage={handleAddImage} />
                <Button variant="contained" sx={{ marginLeft: '20px' }} disabled={isSaveButtonDisabled(errors, touched)} 
                        type="submit">Save</Button>
              </Box>
              { isSubmitting && (<UploadingBackdrop isSubmitting={isSubmitting} />) }
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  )
}
