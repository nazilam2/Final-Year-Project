//Import the libraries and modules 
import React, { useEffect, useState } from "react";
//import Firbase database function and configuration 
import { database, ref, onValue } from "./firebase"; 

//Define the main App component 
function App() {
  //State to store the fetched sensor data 
  const [sensorData, setSensorData] = useState([]);
  //state to taggle the visbility of the sensor data 
  const [showSensorData, setShowSensorData] = useState(false); // State to toggle visibility of sensor data

  //useEffect hook to fetch data from Firebase when compnents mounts 
  useEffect(() => {
    //Define the reference to the 'sensor' node in the Firbase Realtime database 
    const sensorRef = ref(database, "sensors");
 
    //Listener to monitor chanages in the firbase database 
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        //if data exists in the 'sensors' node , process it 
        const data = snapshot.val();
        console.log("Received Sensor Data ", data);  //log for debugging 

        //Transform the data into an array of objects with IDs 
        const formattedData = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));

        setSensorData(formattedData); //update the state with the proccessed data 
      } else {
        console.log("No data available");
        setSensorData([]); //empty array if no data is found 
      }
    });

    //clean up the lisener when the component unmounts. 
    return () => unsubscribe();
  }, []); //empty array ensuring this effect only runs once when the component mounts 

  //This function toggle the visibility of the sensor data section 
  const handleToggleSensorData = () => {
    setShowSensorData(!showSensorData); //Toggle te state between true or fals - show or hide 
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Home page content */}
      <header style={{ marginBottom: "20px" }}>
        <h1>Sensors Data </h1>
        
        {/* Button to show/hide sensor data */}
        <button onClick={handleToggleSensorData} style={{ padding: "10px 20px", cursor: "pointer", fontSize: "16px" }}>
          {showSensorData ? "Hide Data" : "Show Sensor Data"}
        </button>
      </header>

      {/* Sensor data section */}
      {showSensorData && (
        <section>
          <h2>Sensor Data</h2>
          {sensorData.length > 0 ? (
            <ul>
              {sensorData.map((data) => (
                <li key={data.id} style={{ marginBottom: "10px" }}>
                  <p><strong>Data:</strong> {data.data}</p>
                  <p><strong>Timestamp:</strong> {new Date(data.timestamp * 1000).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No data to display</p>
          )}
        </section>
      )}

    </div>
  );
} //end of return 

//export the App component as the default export 
export default App;

//end of App 