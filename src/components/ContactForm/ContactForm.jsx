import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactForm = ({ addContact }) => {
 const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    number: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
 });

 return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        addContact(values.name, values.number);
        resetForm();
      }}
    >
      <Form className="contact-form">
        <label htmlFor="name">Name</label>
        <Field id="name" name="name" placeholder="Enter name" />
        <ErrorMessage name="name" component="div" />

        <label htmlFor="number">Number</label>
        <Field id="number" name="number" placeholder="Enter number" />
        <ErrorMessage name="number" component="div" />

        <button type="submit">Add Contact</button>
      </Form>
    </Formik>
 );
};

export default ContactForm;
