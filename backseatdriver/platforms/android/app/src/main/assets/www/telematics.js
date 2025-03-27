document.addEventListener('deviceready', function () {
    const outputDiv = document.getElementById('output');
    const rpmDisplay = document.getElementById('rpmDisplay');
    const VehSpeedDisplay = document.getElementById('VehSpeedDisplay');
    const signalsTable = document.getElementById('signalsTable');

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
                appendOutput('Devices:');
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
                document.getElementById('connectLabel').innerHTML = 'connected to ' + deviceId;
                // Fetch OBD signals after a successful connection
                fetchOBDSignals(); // Call fetchOBDSignals after connecting
            },
            (error) => {
                appendOutput('Error connecting to device: ' + error);
                document.getElementById('connectLabel').innerHTML = 'not connected';
            }
        );
    }

    // Function to fetch OBD-II signals
    function getOBDSignal(pid, title, callback) {
        bluetoothSerial.write(pid + '\r', () => {
            appendOutput(`Fetching signal for PID: ${pid}...`);

            // Read response from OBD-II device
            bluetoothSerial.read((data) => {
                // Parse the data here (assuming it's a hexadecimal string response)
                const response = parseOBDResponse(data);
                document.getElementById('output').innerHTML = document.getElementById('output').innerHTML + '\n' + title + ' : ' + response;
                appendOutput(`PID : ${pid} | DATA: ${data} | RESPONSE : ${response}`);
                callback(response);
            }, (error) => {
                appendOutput('Error reading response: ' + error);
            });
        }, (error) => {
            appendOutput('Error sending PID command: ' + error);
        });
    }

    // Function to parse the OBD-II response (example for RPM)
    function parseOBDResponse(data) {
        // Example: data might be in the format "41 0C 1A 40"
        // return data
        const parts = data.split(' ');
        if (parts.length >= 3) {
            const valueHex = parts[2]; // Get the hex value after the PID response
            return valueHex
            const value = parseInt(valueHex, 16); // Convert hex to decimal
            return value; // Return the parsed value
        }
        // return 0; // Default to 0 if parsing fails
    }

    // Function to update OBD-II signals in the table
    function updateOBDSignals(signals) {
        // Clear the current table rows
        signalsTable.innerHTML = '';
        // Add header row
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>Signal Name</th><th>Value</th>';
        signalsTable.appendChild(headerRow);

        // Populate the table with signal data
        signals.forEach(signal => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${signal.name}</td><td>${signal.value}</td>`;
            signalsTable.appendChild(row);
        });
    }

    // Function to fetch and display OBD-II signals
    function fetchOBDSignals() {
        const signals = [];

        // Fetch RPM signal
        getOBDSignal('012F', "Fuel Level", (FuelLevel) => {
            rpmDisplay.textContent = `Fuel Level : ${FuelLevel}`;
            // document.getElementById('output').innerHTML = document.getElementById('output').innerHTML + `\nCurrent RPM: ${rpmValue}`;
            // signals.push({ name: 'Engine RPM', value: `${rpmValue}` });
            // You can add more signals here by repeating the getOBDSignal call
        });

        // Fetch RPM signal
        getOBDSignal('010C', "Current RPM", (rpmValue) => {
            rpmDisplay.textContent = `Current RPM: ${rpmValue}`;
            // document.getElementById('output').innerHTML = document.getElementById('output').innerHTML + `\nCurrent RPM: ${rpmValue}`;
            // signals.push({ name: 'Engine RPM', value: `${rpmValue}` });
            // You can add more signals here by repeating the getOBDSignal call
        });

        // Fetch RPM signal
        getOBDSignal('010D', "Vehicle Speed", (VehSpeed) => {
            VehSpeedDisplay.textContent = `Vehicle Speed: ${VehSpeed}`;
            // document.getElementById('output').innerHTML = document.getElementById('output').innerHTML + `\nVehicle Speed: ${VehSpeed}`;
            // signals.push({ name: 'Engine RPM', value: `${rpmValue}` });
            // You can add more signals here by repeating the getOBDSignal call
        });


    }

    // Function to be called when the button is clicked
    document.getElementById('connectButton').onclick = function () {
        bluetoothSerial.list(
            (devices) => {
                if (devices.length > 0) {
                    connectToDevice(devices[0].id); // Connect to the first device
                    // connectLabel.innerHTML = devices[0].id;
                } else {
                    appendOutput('No devices found.');
                    // document.getElementById('connectLabel').innerHTML = 'not connected';
                }
            },
            (error) => {
                appendOutput('Error listing devices: ' + error);
            }
        );
    };

    // Button to refresh OBD-II signals
    timeri = 5;
    // document.getElementById('refreshSignalsButton').onclick = function () {
    timer = setInterval(function () {


        if (timeri > 0) {
            timeri = timeri - 1;
            if (document.getElementById('toggleSwitch').value == 'on') {
                fetchOBDSignals(); // Fetch and update signals when clickedd
                document.getElementById('output').innerHTML = '';
            }
        } else {
            timeri = 5;
        }

        timerLabel.innerHTML = timeri + ' seconds... to next refresh';

    }, 1000);
    // };



    // List Bluetooth devices when the app starts
    listBluetoothDevices();
});

function togglebutton() {
    btn = document.getElementById('toggleSwitch');
    if (btn.value == 'on') {
        btn.value = 'off';
    } else {
        btn.value = 'on';
    }
}