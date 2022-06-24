export const validateForm = (values) => {
    const errors = {};

    if(!values.firstName) {
      errors.firstName = "First Name is required";
    }

    if(!values.lastName) {
      errors.lastName = "Last Name is required";
    }

    if(!values.description) {
      errors.description = "Description is required";
    }

    if(!values.email) {
      errors.email = "Email is required";
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Please enter a valid email';
    }

    return errors;
}