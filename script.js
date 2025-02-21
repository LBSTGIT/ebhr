document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            window.employeeData = data.Active_Master;
            populateEmployeeDropdown();
        });
});

function populateEmployeeDropdown() {
    const select = document.getElementById("employeeSelect");
    window.employeeData.forEach(employee => {
        const option = document.createElement("option");
        option.value = employee["Employee Code"];
        option.textContent = employee.Employee;
        select.appendChild(option);
    });
    updateEmployeeDetails();
}

function updateEmployeeDetails() {
    const selectedCode = document.getElementById("employeeSelect").value;
    const employee = window.employeeData.find(emp => emp["Employee Code"] === selectedCode);
    if (!employee) return;

    document.getElementById("level").textContent = employee.Level;
    document.getElementById("currentSum").textContent = employee["Current Sum Insured"];
    document.getElementById("currentPremium").textContent = employee["Current Monthly Premium"];
    document.getElementById("proposedSum").textContent = employee["Proposed Sum insured"];
    
    const lookupTable = {
        "E1": { Self: 600, Kid: 300, Parent: 500, Spouse: 600 },
        "E2": { Self: 600, Kid: 300, Parent: 500, Spouse: 600 },
        "MM1": { Self: 900, Kid: 400, Parent: 700, Spouse: 1000 },
        "MM2": { Self: 900, Kid: 400, Parent: 700, Spouse: 1000 },
        "SM1": { Self: 1500, Kid: 600, Parent: 1000, Spouse: 1500 },
        "SM2": { Self: 1500, Kid: 600, Parent: 1000, Spouse: 1500 },
        "EM1": { Self: 2500, Kid: 900, Parent: 1500, Spouse: 2000 },
        "EM2": { Self: 2500, Kid: 900, Parent: 1500, Spouse: 2000 },
        "O1": { Self: 600, Kid: 300, Parent: 500, Spouse: 600 },
        "O2": { Self: 600, Kid: 300, Parent: 500, Spouse: 600 }
    };
    
    const premiums = lookupTable[employee.Level] || { Self: 0, Kid: 0, Parent: 0, Spouse: 0 };
    
    document.getElementById("newPremium").textContent = premiums.Self;
    document.getElementById("selfPremium").textContent = premiums.Self;
    
    document.getElementById("spousePremium").textContent = premiums.Spouse;
    document.getElementById("parentPremium").textContent = premiums.Parent;
    document.getElementById("childrenPremium").textContent = premiums.Kid;
    
    calculateTotal();
}

function calculateTotal() {
    const spouseChecked = document.getElementById("spouseCheck").checked;
    const parentCount = parseInt(document.getElementById("parentSelect").value) || 0;
    const childCount = parseInt(document.getElementById("childrenInput").value) || 0;
    
    const spousePremium = spouseChecked ? parseInt(document.getElementById("spousePremium").textContent) : 0;
    const parentPremium = parentCount * parseInt(document.getElementById("parentPremium").textContent);
    const childPremium = childCount * parseInt(document.getElementById("childrenPremium").textContent);
    
    document.getElementById("spouseRowTotal").textContent = spousePremium;
    document.getElementById("parentRowTotal").textContent = parentPremium;
    document.getElementById("childrenRowTotal").textContent = childPremium;
    
    const dependentTotal = spousePremium + parentPremium + childPremium;
    document.getElementById("dependentTotal").textContent = dependentTotal;
    
    const selfPremium = parseInt(document.getElementById("selfPremium").textContent);
    const grandTotal = selfPremium + dependentTotal;
    document.getElementById("totalPremium").textContent = grandTotal;
}

function updateActiveMaster() {
    alert("Data updated successfully!");
}
