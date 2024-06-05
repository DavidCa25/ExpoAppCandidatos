import { StatusBar } from 'expo-status-bar';

import CandidatoApp from './pages/CandidatoApp';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const App = () => {
  return (
    <SafeAreaProvider>
      <CandidatoApp/>
      <StatusBar style="auto" />
    </SafeAreaProvider> 
  );
}

export default App;