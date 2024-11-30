//Import React library for bulding the UI 
import React from 'react';
//import naviagtionContainer to mange navigation state in the app 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/components/HomePage';  // Import the homepage component from its file path 
import MetricsScreen from './src/components/MetricsScreen'; // Import the Metrics Screen component from its file path 

//create a stack navigator instance 
const Stack = createStackNavigator();

//Main app component 
const App = () => {
  return (
    //Wrap the navigation stack in the navigationcontiner to mange the naviagtion context 
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} options={{ title: 'Home Page' }} />
        <Stack.Screen name="Metrics" component={MetricsScreen} options={{ title: 'Metrics' }} />
      </Stack.Navigator>
    </NavigationContainer>
  ); //end of NavigationContainer
}; //end of App 
export default App;
//End of program 