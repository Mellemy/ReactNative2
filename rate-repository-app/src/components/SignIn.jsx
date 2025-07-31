import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';


const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 2,
    padding: 15,
    marginBottom: 15,
  },
});

const SignIn = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}  
            placeholder="Username" value={values.username} 
             onChangeText={handleChange('username')}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
          />
          <Button onPress={handleSubmit} title="Sign in" />
        </View>
      )}
    </Formik>
  );
};

export default SignIn;