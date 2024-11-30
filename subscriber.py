#Name: Nazila Malekzadah C21414344
#Date: 30:11:2024
#Description : This program is subscriber , it  fetches the data from MQTT broker and then send it to Firebase Realtime database 

##Import Librarys 
import paho.mqtt.client as mqtt #For MQTT Communication 
import firebase_admin # Firbase integration 
from firebase_admin import credentials, db  # This handle Firebase credentials 
import time # for timestamsp 

#Initialize Firebase Admin SDK 
cred = credentials.Certificate(r"C:\Users\Nazil\Documents\FYP Codes\serviceAccountKey.json")  # Path to service key 
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://sensors-data-fe6f3-default-rtdb.firebaseio.com/' # Firebase database URL 
})

#MQTT Callback function triggered wheb the MQTT client connects to te broker . 
def on_connect(client, userdata, flags, rc):
    print("Connected to the MQTT broker with result code " + str(rc))
    client.subscribe("FYP_sensor_data") # This is the topic data is sent to 
#End of function 

#Callback function triggered when a message is received on a subsribed topic 
def on_message(client, userdata, msg):
    try:
        #Decode the received message 
        sensor_data = msg.payload.decode()
        print(f"Received message: {sensor_data} from topic:{msg.topic}")

        #Send sensors data to the Firebase Realtime database 
        ref = db.reference('sensors')  # Firbase database referance 
        ref.push({
            'data': sensor_data, 
            'timestamp': time.time() # Store the timestamp of when the data is recieved in the database 
        })
        print("Data sent to Firebase. ")
    except Exception as e:
        print(f"Error processing data: {e}")
#End of function  

# Configuring the MQTT Client 
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

#Connect to MQTT Broker 
client.connect("test.mosquitto.org", 1883, 60)

#Listening for messages 
print("Listening for MQTT messages ...")
client.loop_forever()