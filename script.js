document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            window.employeeData = data.Active_Master;
            populateDropdown();
        });
});

function populateDropdown() {
    const select = document.getElementById("employeeSelect");
    window.employeeData.forEach(employee => {
        const option = document.createElement("option");
        option.value = employee["Employee Code"];
        option.textContent = employee.Employee;
        select.appendChild(option);
    });
}

function updateEmployeeDetails() {
    const selectedCode = document.getElementById("employeeSelect").value;
    const employee = window.employeeData.find(emp => emp["Employee Code"] === selectedCode);
    if (!employee) return;
    
    document.getElementById("level").textContent = employee.Level;
    document.getElementById("currentSum").textContent = employee["Current Sum Insured"];
    document.getElementById("proposedSum").textContent = employee["Proposed Sum insured"];
    
    const premiums = {
        "E": { self: 600, child: 300, parent: 500, spouse: 600 },
        "MM": { self: 900, child: 400, parent: 700, spouse: 1000 },
        "SM": { self: 1500, child: 600, parent: 1000, spouse: 1500 },
        "EM": { self: 2500, child: 900, parent: 1500, spouse: 2000 },
        "O": { self: 600, child: 300, parent: 500, spouse: 600 }
    };
    
    const levelPremiums = premiums[employee.Level];
    document.getElementById("spousePremium").textContent = levelPremiums.spouse;
    document.getElementById("parentPremium").textContent = levelPremiums.parent;
    document.getElementById("childrenPremium").textContent = levelPremiums.child;
}

function calculateTotal() {
    const spouseChecked = document.getElementById("spouseCheck").checked;
    const parentCount = parseInt(document.getElementById("parentSelect").value, 10);
    const childrenCount = parseInt(document.getElementById("childrenInput").value, 10);
    
    const spousePremium = parseInt(document.getElementById("spousePremium").textContent, 10);
    const parentPremium = parseInt(document.getElementById("parentPremium").textContent, 10);
    const childrenPremium = parseInt(document.getElementById("childrenPremium").textContent, 10);
    
    document.getElementById("spouseTotal").textContent = spouseChecked ? spousePremium : 0;
    document.getElementById("parentTotal").textContent = parentCount * parentPremium;
    document.getElementById("childrenTotal").textContent = childrenCount * childrenPremium;
    
    const total = (spouseChecked ? spousePremium : 0) + (parentCount * parentPremium) + (childrenCount * childrenPremium);
    document.getElementById("totalPremium").textContent = total;
}

function updateActiveMaster() {
    const selectedCode = document.getElementById("employeeSelect").value;
    const employeeIndex = window.employeeData.findIndex(emp => emp["Employee Code"] === selectedCode);
    if (employeeIndex === -1) return;
    
    window.employeeData[employeeIndex]["New Monthly Premium"] = parseInt(document.getElementById("totalPremium").textContent, 10);
    console.log("Updated Active_Master:", window.employeeData);
}
