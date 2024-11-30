#Name:Nazila Malekzadah C21414344 
#Date 30:11:2024
#Description: This is Raspberry PI Pico W publisher code , it publish the data to the MQTT broker . 

#Import Librarys 
import network
from umqtt.simple import MQTTClient
from machine import Pin, ADC, I2C
from time import sleep 
import struct 

#WiFi setup (Connected to my phone hotspot)
ssid = 'Nazila'
password = '12345678'

#This method is for wifi conection 
def connect_w():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)
    while not wlan.isconnected():
        print('Connecting to WIFI.. ')
        sleep(1)
    print('Connected to WIFI')
    print(wlan.ifconfig())
#End of function 

#This method is used for MQTT setup 
mqtt_server = "test.mosquitto.org" #Public MQTT broker 
client_id = "raspberry-pico" # client ID (Raspberry PI Pico )
topic = "FYP_sensor_data" # Topic to publish sensor data 

#This method is used to handle MQTT connection 
def connect_mqtt():
    client = MQTTClient(client_id, mqtt_server)
    try:
        client.connect()
        print("Connected to MQTT Broker")
        return client
    except Exception as e:
        print(f"Failed to connect to MQTT Broker: {e}")
        return None
#End of function 

#ADC setup for the potentiometer 
pot = ADC(Pin(26)) # potentiometer is connected to GPIO 26 

# I2C setup for the accelerometer 
i2c = I2C(1, freq=100000, sda=Pin(2), scl=Pin(3)) # I2C on SDA pin 2 and SCL pin 3 
ACCELEROMETER_ADDRESS = 25

#This method is used to setup accelerometer

def accelerometer_setup():
    try:
        i2c.writeto_mem(ACCELEROMETER_ADDRESS, 0x20, b'\x97')
        i2c.writeto_mem(ACCELEROMETER_ADDRESS, 0x24, b'\x40')
        print("Accelerometer setup complete. ")
    except Exception as e:
        print(f"Error setting up accelerometer: {e}")
#End of function 

#This function is used read the accelerometer  data 
def read_accelerometer(axis):
    axis_map = {'x': (0x28, 0x29), 'y': (0x2A, 0x2B), 'z': (0x2C, 0x2D)}
    try:
        low_byte = i2c.readfrom_mem(ACCELEROMETER_ADDRESS,axis_map[axis][0], 1)
        high_byte = i2c.readfrom_mem(ACCELEROMETER_ADDRESS,axis_map[axis][1], 1)
        return struct.unpack('<h', bytearray([low_byte[0], high_byte[0]]))[0]
    except Exception as e:
        print(f"Error reading accelerometer {axis} axis: {e}")
        return 0 
#End of funtion 

#This method publish the data 
def pub_sensor_data():
    client = connect_mqtt()
    if client is None:
        print("MQTT connection failed")
        return 
    accelerometer_setup()

    while True:
        try:
            pot_value = pot.read_u16() # Read potentiometer  value 
            accelerometer_x = read_accelerometer('x') # Read X-axis of the accelerometer 
            accelerometer_y = read_accelerometer('y') # Read Y-axis of the accelerometer 
            accelerometer_z = read_accelerometer('z') # Read Z-axis of the accelerometer 

            #Combine data into a JSON string 
            sensor_data = {
                "Potentiometer": pot_value , 
                "Accelerometer": {
                    "x": accelerometer_x,
                    "y": accelerometer_y,
                    "z": accelerometer_z 
                }
            }
            #Publish data to MQTT topic 
            sensor_data_str = str(sensor_data) # Convert to string for MQTT 
            print(f"Publishing: {sensor_data_str}")
            client.publish(topic, sensor_data_str)
            sleep(0.5)

            #This ensures MQTT client is still working 
            client.check_msg() #Allow MQTT client to maintain the connection 
        except Exception as e:
            print(f"Error while reading or publising data: {e}")
#End of function 

#Main execution 
connect_w()
pub_sensor_data()