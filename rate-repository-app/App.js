import Main from './src/components/Main';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';

const App = () => {
  return (
    <>
    <NativeRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};
//test
export default App;