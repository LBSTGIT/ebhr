<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Insurance Form</title>
    <script src="script.js" defer></script>
    <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            padding: 8px;
            text-align: center;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <h2>Employee Insurance Selection</h2>
    <label for="employeeSelect">Select Employee:</label>
    <select id="employeeSelect" onchange="updateEmployeeDetails()">
        <option value="">-- Select --</option>
    </select>
    
    <h3>Employee Details</h3>
    <p><strong>Level:</strong> <span id="level"></span></p>
    <p><strong>Current Sum Insured:</strong> <span id="currentSum"></span></p>
    <p><strong>Proposed Sum Insured:</strong> <span id="proposedSum"></span></p>
    
    <h3>Dependent Insurance Selection</h3>
    <table>
        <thead>
            <tr>
                <th>Dependent</th>
                <th>Monthly Premium</th>
                <th>Response</th>
                <th>Total Premium</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Spouse</td>
                <td id="spousePremium">0</td>
                <td><input type="checkbox" id="spouseCheck" onchange="calculateTotal()"></td>
                <td id="spouseTotal">0</td>
            </tr>
            <tr>
                <td>Parent 1</td>
                <td id="parent1Premium">0</td>
                <td><input type="checkbox" id="parent1Check" onchange="calculateTotal()"></td>
                <td id="parent1Total">0</td>
            </tr>
            <tr>
                <td>Parent 2</td>
                <td id="parent2Premium">0</td>
                <td><input type="checkbox" id="parent2Check" onchange="calculateTotal()"></td>
                <td id="parent2Total">0</td>
            </tr>
            <tr>
                <td>Children</td>
                <td id="childrenPremium">0</td>
                <td><input type="number" id="childrenInput" min="0" value="0" onchange="calculateTotal()"></td>
                <td id="childrenTotal">0</td>
            </tr>
        </tbody>
    </table>
    <h3>Total Premium: <span id="totalPremium">0</span></h3>
    <button onclick="updateActiveMaster()">Update</button>
</body>
</html>
