import { StatusBar } from 'expo-status-bar';
import CandidatoApp from './pages/CandidatoApp';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioCandido from './pages/InicioCandido';
import IneApp from './pages/IneApp';

const Stack = createStackNavigator();


const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="InicioVista" component={InicioCandido}/>
          <Stack.Screen name="IneApp" component={IneApp}/>
          <Stack.Screen name="CandidatoVotar" component={CandidatoApp}/>
        </Stack.Navigator>  
      </NavigationContainer>
    </SafeAreaProvider> 
  );
}

export default App;