import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Text from './Text';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
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
  username: Yup.string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const onSubmit = async ({ username, password }) => {
    try {
      await signUp({ username, password });
      const result = await signIn({ username, password });

      if (result?.data?.authenticate?.accessToken) {
        navigate('/');
      }
    } catch (error) {
      console.error('Signup failed:', error);
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
            placeholder="Username"
            style={[
              styles.input,
              touched.username && errors.username && styles.inputError,
            ]}
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={[
              styles.input,
              touched.password && errors.password && styles.inputError,
            ]}
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            style={[
              styles.input,
              touched.passwordConfirmation && errors.passwordConfirmation && styles.inputError,
            ]}
            value={values.passwordConfirmation}
            onChangeText={handleChange('passwordConfirmation')}
            onBlur={handleBlur('passwordConfirmation')}
          />
          {touched.passwordConfirmation && errors.passwordConfirmation && (
            <Text style={styles.errorText}>{errors.passwordConfirmation}</Text>
          )}

          <Button onPress={handleSubmit} title="Sign up" />
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
