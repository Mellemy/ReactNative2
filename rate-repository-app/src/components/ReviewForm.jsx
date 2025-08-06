import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Text from './Text';
import useCreateReview from '../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 2,
    padding: 15,
    marginBottom: 20,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    marginTop: -15,
  },
});

const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required('Repository owner name is required'),
  repositoryName: Yup.string().required('Repository name is required'),
  rating: Yup.number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: Yup.string().optional(),
});

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const data = await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      });

      if (data?.createReview?.repositoryId) {
        navigate(`/repositories/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.error('Review creation failed:', e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleSubmit, values, errors, touched, handleBlur }) => (
        <View style={styles.container}>
          <TextInput
            placeholder="Repository owner name"
            style={[
              styles.input,
              touched.ownerName && errors.ownerName && styles.inputError,
            ]}
            value={values.ownerName}
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.errorText}>{errors.ownerName}</Text>
          )}

          <TextInput
            placeholder="Repository name"
            style={[
              styles.input,
              touched.repositoryName && errors.repositoryName && styles.inputError,
            ]}
            value={values.repositoryName}
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
          />
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.errorText}>{errors.repositoryName}</Text>
          )}

          <TextInput
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
            style={[
              styles.input,
              touched.rating && errors.rating && styles.inputError,
            ]}
            value={values.rating}
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
          />
          {touched.rating && errors.rating && (
            <Text style={styles.errorText}>{errors.rating}</Text>
          )}

          <TextInput
            placeholder="Review"
            style={[styles.input]}
            multiline
            value={values.text}
            onChangeText={handleChange('text')}
          />

          <Button onPress={handleSubmit} title="Create a review" />
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;