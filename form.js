document.getElementById('offlineForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Capture form data
    let formData = {
        fullName: document.getElementById('fullName').value,
        lifegroupLeader: document.getElementById('lifegroupLeader').value
    };

    if (navigator.onLine) {
        // If online, send data to Google Sheets
        fetch('YOUR_GOOGLE_SCRIPT_URL', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())  // Parse the JSON response
        .then(data => alert("Data submitted successfully!"))
        .catch(error => alert("Error submitting data: " + error));
    } else {
        // If offline, store data in localStorage
        let offlineData = JSON.parse(localStorage.getItem('offlineData')) || [];
        offlineData.push(formData);
        localStorage.setItem('offlineData', JSON.stringify(offlineData));
        alert('Form submitted offline, will sync once online!');
    }
});
