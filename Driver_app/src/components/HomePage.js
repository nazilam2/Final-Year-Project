//Import React and necessary compoents from React Native 
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

//Define Hompage component and recive navigation prop for screen navigation 
const HomePage = ({ navigation }) => {
  // Functions for button presses
  //Function to handle the Drive Monitoring butto press 
  const handleDriveMonitoringPress = () => {
    alert('Button Pressed');
  }; //end of function 

  //Function to handel the Metrics button press 
  const handleMetricsPress = () => {
    navigation.navigate('Metrics'); //When the button is pressed navigate to the Metricsscreen 
  }; //end of function 

  return (
    //Main contianer view 
    <View style={styles.container}>
      <Text style={styles.title}>DriveGuard</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleDriveMonitoringPress}>
        <Text style={styles.buttonText}>Drive Monitoring</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleMetricsPress}>
        <Text style={styles.buttonText}>Metrics</Text>
      </TouchableOpacity>
    </View>
  ); //end of contianer 
};

//This section defines styles for the Home page comonent 
const styles = StyleSheet.create({
  //style for the  main continer 
  container: {
    flex: 1,      // use full screen space 
    justifyContent: 'center', //central items 
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  //style for the title text 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  //style for the buttons 
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10, // Add space between buttons
  },
  //style for the button text 
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
//export the HomePage component as the defualt export 
export default HomePage;

