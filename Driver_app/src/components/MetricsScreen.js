//Import necessary ibraries 
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
//import Firebase Realtime Database 
import database from '@react-native-firebase/database';

//Define the MetricsScreen component , which disply sensor data 
const MetricsScreen = ({ navigation }) => { 
  //State to store the fetched sensor data 
  const [sensorData, setSensorData] = useState([]);
  //state to mange the loading spinner 
  const [loading, setLoading] = useState(false);

  //This function is used to fetch sensor data from firebase 
  const fetchSensorData = async () => {
    setLoading(true); // show the loading spinner 
    try {
      //fetch data from the 'sensors' node in firebase 
      const snapshot = await database().ref('/sensors').once('value');
      const data = snapshot.val(); // Retrieve the data 
      if (data) {
        //format the data into a list with keys, values , and timestamps 
        const formattedData = Object.entries(data).map(([key, value]) => ({
          id: key, //use the database key as a unique identifier 
          data: value.data, //extract the sensor data value 
          timestamp: new Date(value.timestamp * 1000).toLocaleString(), //convert the timestamp to a readable format 
        }));
        setSensorData(formattedData); //update the sensor data state 
      } else {
        setSensorData([]); //set an empty array if no data is found 
      }
    } catch (error) {
      //log an error if fetching data fails 
      console.error('Error fetching sensor data:', error);
    }
    setLoading(false);
  }; //end of function 

  //fetch sensor data when the component loads 
  useEffect(() => {
    fetchSensorData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sensor Matrics</Text>

      {/* Button to go back to the home page */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : sensorData.length > 0 ? (
        <FlatList
          data={sensorData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemData}>Value: {item.data}</Text>
              <Text style={styles.itemTimestamp}>Timestamp: {item.timestamp}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No sensor data avialiable.</Text>
      )}
      <Button title="Refresh Data" onPress={fetchSensorData} />
    </View>
  ); //end of return 
};

// define the style for the component 
const styles = StyleSheet.create({
  //Main contianer styling 
  container: {
    flex: 1,  //full screen 
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  //heade text styling 
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  //back button styling 
  backButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'center',
  },
  //button text styling
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  //styling for each data itme in the list 
  item: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
  },
  itemData: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemTimestamp: {
    fontSize: 14,
    color: '#555',
  },
});
//export the component as the defual export 
export default MetricsScreen;

