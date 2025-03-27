document.addEventListener('deviceready', function () {
    const outputDiv = document.getElementById('output');
    const rpmDisplay = document.getElementById('rpmDisplay');
    const VehSpeedDisplay = document.getElementById('VehSpeedDisplay');
    const ThrottlePosDisplay = document.getElementById('throttleposDisplay');
    const FuelLevelDisplay = document.getElementById('FuelLevelDisplay');
    const MassAirFlowDisplay = document.getElementById('MassAirFlowDisplay');
    const IntakeAirTempDisplay = document.getElementById('IntakeAirTempDisplay');
    const CoolantTempDisplay = document.getElementById('CoolantTempDisplay');

    const signalsTable = document.getElementById('signalsTable');

    let isFetching = false; // To prevent overlapping fetch calls
    let isConnected = false; // Track Bluetooth connection status

    // Function to append messages to the output div
    function appendOutput(message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        outputDiv.appendChild(messageDiv);
    }

    // Function to list Bluetooth devices
    function listBluetoothDevices() {
        bluetoothSerial.list(
            (devices) => {
                appendOutput('Devices found:');
                devices.forEach((device) => {
                    appendOutput(`- ${device.name} (${device.id})`);
                });
            },
            (error) => {
                appendOutput('Error listing devices: ' + error);
            }
        );
    }

    // Function to connect to a specific Bluetooth device
    function connectToDevice(deviceId) {
        bluetoothSerial.connect(deviceId,
            () => {
                appendOutput(`Connected to ${deviceId}`);
                document.getElementById('connectLabel').innerHTML = 'Connected to ' + deviceId;
                isConnected = true;
                fetchLiveOBDSignals(); // Start fetching signals live
            },
            (error) => {
                appendOutput('Error connecting to device: ' + error);
                document.getElementById('connectLabel').innerHTML = 'Not connected';
                isConnected = false;
            }
        );
    }

    // Function to fetch OBD-II signal
    function getOBDSignal(pid, callback) {
        if (!isConnected || isFetching) return;

        isFetching = true;
        bluetoothSerial.write(pid + '\r', () => {
            bluetoothSerial.read((data) => {
                const response = parseOBDResponse(data);
                isFetching = false;
                callback(response);
            }, (error) => {
                appendOutput('Error reading response: ' + error);
                isFetching = false;
            });
        }, (error) => {
            appendOutput('Error sending PID command: ' + error);
            isFetching = false;
        });
    }

    // Function to parse the OBD-II response
    function parseOBDResponse(data) {
        const parts = data.split(' ');
        if (parts.length >= 3) {
            const valueHex = parts[2];
            const value = parseInt(valueHex, 16);
            return value;
        }
        return 'N/A';
    }

    function updateSignal(signalDisplay, pid, signalName) {
        getOBDSignal(pid, (value) => {
            if (value !== 'N/A') {
                document.getElementById(signalDisplay).innerHTML = `${signalName}: ${value}`;
                // alert(`${signalName}: ${value}`);
                // document.getElementById('output').innerHTML = document.getElementById('output').innerHTML + signalName + ':' + value + '\n\n';
            }
        });
    }

    // Function to fetch and display signals live
    function fetchLiveOBDSignals() {
        // if (!isConnected) return;



        // // Continuously fetch and display signals
        // setInterval(() => {

        //     updateSignal(VehSpeedDisplay, '010D', 'Vehicle_Speed');
        //     updateSignal(rpmDisplay, '010C', 'Engine_RPM');
        //     // updateSignal(ThrottlePosDisplay,'0111','Throttle Position Display');
        //     // updateSignal(FuelLevelDisplay,'012F','Fuel Level Display');
        //     // updateSignal(MassAirFlowDisplay,'0110','Mass Air Flow Display');
        //     // updateSignal(IntakeAirTempDisplay,'010F','Intake Air Temp Display');
        //     // updateSignal(CoolantTempDisplay,'0105','Coolant Temp Display');


        // }, 500); // Fetch every 500ms

        // setInterval(() => {
        //     updateSignal(rpmDisplay, '010C', 'Engine RPM');
        // }, 500);
    }

    // Function to handle Bluetooth device connection
    document.getElementById('connectButton').onclick = function () {
        bluetoothSerial.list(
            (devices) => {
                if (devices.length > 0) {
                    connectToDevice(devices[0].id);
                } else {
                    appendOutput('No devices found.');
                }
            },
            (error) => {
                appendOutput('Error listing devices: ' + error);
            }
        );
    };

    // List Bluetooth devices when the app starts
    listBluetoothDevices();
});