document.addEventListener("DOMContentLoaded", function () {
    let employees = [];
    let gradePremiums = {
        "E1": { self: 600, kid: 300, parent: 500, spouse: 600 },
        "E2": { self: 600, kid: 300, parent: 500, spouse: 600 },
        "MM1": { self: 900, kid: 400, parent: 700, spouse: 1000 },
        "MM2": { self: 900, kid: 400, parent: 700, spouse: 1000 },
        "SM1": { self: 1500, kid: 600, parent: 1000, spouse: 1500 },
        "SM2": { self: 1500, kid: 600, parent: 1000, spouse: 1500 },
        "EM1": { self: 2500, kid: 900, parent: 1500, spouse: 2000 },
        "EM2": { self: 2500, kid: 900, parent: 1500, spouse: 2000 },
        "O1": { self: 600, kid: 300, parent: 500, spouse: 600 },
        "O2": { self: 600, kid: 300, parent: 500, spouse: 600 }
    };

    fetch('Active_Master.json')
        .then(response => response.json())
        .then(data => {
            employees = data.Active_Master;
            populateEmployeeDropdown();
        });

    function populateEmployeeDropdown() {
        let dropdown = document.getElementById("employeeSelect");
        employees.forEach(emp => {
            let option = document.createElement("option");
            option.value = emp["Employee Code"];
            option.textContent = emp.Employee;
            dropdown.appendChild(option);
        });
    }

    window.updateEmployeeDetails = function () {
        let selectedCode = document.getElementById("employeeSelect").value;
        let selectedEmployee = employees.find(emp => emp["Employee Code"] === selectedCode);
        if (!selectedEmployee) return;

        document.getElementById("level").textContent = selectedEmployee.Level;
        document.getElementById("currentSum").textContent = selectedEmployee["Current Sum Insured"];
        document.getElementById("proposedSum").textContent = selectedEmployee["Proposed Sum insured"];
        
        let premiums = gradePremiums[selectedEmployee.Level] || { self: 0, kid: 0, parent: 0, spouse: 0 };
        document.getElementById("spousePremium").textContent = premiums.spouse;
        document.getElementById("parentPremium").textContent = premiums.parent;
        document.getElementById("childrenPremium").textContent = premiums.kid;
    };

    window.calculateTotal = function () {
        let selectedCode = document.getElementById("employeeSelect").value;
        let selectedEmployee = employees.find(emp => emp["Employee Code"] === selectedCode);
        if (!selectedEmployee) return;

        let premiums = gradePremiums[selectedEmployee.Level] || { self: 0, kid: 0, parent: 0, spouse: 0 };

        let spouseChecked = document.getElementById("spouseCheck").checked;
        let parentCount = parseInt(document.getElementById("parentSelect").value, 10);
        let childCount = parseInt(document.getElementById("childrenInput").value, 10);

        let spouseTotal = spouseChecked ? premiums.spouse : 0;
        let parentTotal = parentCount * premiums.parent;
        let childrenTotal = childCount * premiums.kid;

        document.getElementById("spouseTotal").textContent = spouseTotal;
        document.getElementById("parentTotal").textContent = parentTotal;
        document.getElementById("childrenTotal").textContent = childrenTotal;
        
        let total = spouseTotal + parentTotal + childrenTotal;
        document.getElementById("totalPremium").textContent = total;
    };

    window.updateActiveMaster = function () {
        let selectedCode = document.getElementById("employeeSelect").value;
        let selectedEmployee = employees.find(emp => emp["Employee Code"] === selectedCode);
        if (!selectedEmployee) return;

        selectedEmployee.NewMonthlyPremium = parseInt(document.getElementById("totalPremium").textContent, 10);
        console.log("Updated Active_Master:", employees);
    };
});
