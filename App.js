import { StatusBar } from 'expo-status-bar';
import CandidatoApp from './pages/CandidatoApp';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioCandido from './pages/InicioCandido';
import IneApp from './pages/IneApp';
import CameraViewApp from './pages/CameraViewApp';
import GraficosVotaciones from './pages/GraficosVotaciones';

const Stack = createStackNavigator();


const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
          name="InicioVista" 
          component={InicioCandido}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#3c4b4e',
            },
          }}
          />
          <Stack.Screen 
          name="IneApp" 
          component={IneApp}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#3c4b4e',
            },
          }}/>
          <Stack.Screen 
          name="CandidatoVotar" 
          component={CandidatoApp}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#3c4b4e',
            },
          }}/>
          <Stack.Screen 
          name="CameraViewApp" 
          component={CameraViewApp}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#3c4b4e',
            },
          }}/>
          <Stack.Screen 
          name="GraficosVotaciones" 
          component={GraficosVotaciones}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#3c4b4e',
            },
          }}/>
        </Stack.Navigator>  
      </NavigationContainer>
    </SafeAreaProvider> 
  );
}

export default App;