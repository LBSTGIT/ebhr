document.addEventListener("DOMContentLoaded", function () {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            let dropdown = document.getElementById("userDropdown");

            // Populate dropdown with user names
            data.forEach(user => {
                let option = document.createElement("option");
                option.value = user.name;
                option.textContent = user.name;
                dropdown.appendChild(option);
            });

            // Store data for lookup
            window.userData = data;
        })
        .catch(error => console.error("Error loading data:", error));
});

function showDetails() {
    let selectedName = document.getElementById("userDropdown").value;
    let detailsBox = document.getElementById("detailsBox");

    if (selectedName) {
        let user = window.userData.find(u => u.name === selectedName);
        if (user) {
            document.getElementById("detail1").textContent = user.detail1;
            document.getElementById("detail2").textContent = user.detail2;
            document.getElementById("detail3").textContent = user.detail3;
            detailsBox.style.display = "block";
        }
    } else {
        detailsBox.style.display = "none";
    }
}
