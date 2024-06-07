document.addEventListener('DOMContentLoaded', (event) => {
    const value1 = document.getElementById('value1');
    const value2 = document.getElementById('value2');
    const value3 = document.getElementById('value3');
    const value4 = document.getElementById('value4');

    const currentValue1 = document.getElementById('currentValue_1');
    const currentValue2 = document.getElementById('currentValue_2');
    const currentValue3 = document.getElementById('currentValue_3');
    const currentValue4 = document.getElementById('currentValue_4');

    const openMonitorBtn = document.getElementById('openMonitorBtn');
    const monitorModal = document.getElementById('monitorModal');
    const closeMonitorBtn = document.getElementById('closeMonitorBtn');

    openMonitorBtn.addEventListener('click', () => {
        monitorModal.style.display = 'flex';
    });

    closeMonitorBtn.addEventListener('click', () => {
        monitorModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == monitorModal) {
            monitorModal.style.display = 'none';
        }
    });

    document.querySelectorAll(".switch-toggle input[type='checkbox']").forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            var status = this.checked ? "on" : "off";
            var lightId = this.id.replace("checkbox_", "");
            toggleLEDBulb(lightId, status);
            sendDataToSpreadsheet(lightId + status);
        });
    });

    function toggleLEDBulb(lightId, status) {
        var bulb = document.getElementById(lightId);
        if (status === "on") {
            bulb.classList.add("on");
        } else {
            bulb.classList.remove("on");
        }
    }

    const webAppUrl = 'https://script.google.com/macros/s/AKfycbyHKjLIrVmP7lZYmKRu3tqKZDJrQ8Ic-dFVdyP9RJjzQRoyBSMKorYgmecv7ARDA5af/exec?read=true';

    async function fetchSheetData() {
        try {
            const response = await fetch(webAppUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    async function updateValues() {
        const data = await fetchSheetData();
        if (data) {
            value1.textContent = data.B4;
            value2.textContent = data.C4;
            value3.textContent = data.D4;
            value4.textContent = data.E4;

            currentValue1.textContent = data.B4;
            currentValue2.textContent = data.C4;
            currentValue3.textContent = data.D4;
            currentValue4.textContent = data.E4;

            const statusData = `${data.A1}`;
            document.getElementById('status_1').textContent = statusData.includes('1on') ? 'ON' : 'OFF';
            document.getElementById('status_2').textContent = statusData.includes('2on') ? 'ON' : 'OFF';
            document.getElementById('status_3').textContent = statusData.includes('3on') ? 'ON' : 'OFF';
            document.getElementById('status_4').textContent = statusData.includes('4on') ? 'ON' : 'OFF';
        } else {
            value1.textContent = 'Error';
            value2.textContent = 'Error';
            value3.textContent = 'Error';
            value4.textContent = 'Error';
        }
    }

    setInterval(updateValues, 1000);
});

function sendDataToSpreadsheet(status) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Data sent successfully");
        }
    };
    xhttp.open("GET", "https://script.google.com/macros/s/AKfycbyHKjLIrVmP7lZYmKRu3tqKZDJrQ8Ic-dFVdyP9RJjzQRoyBSMKorYgmecv7ARDA5af/exec?status=" + status, true);
    xhttp.send();
}

document.addEventListener('DOMContentLoaded', (event) => {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll('.light-card').forEach(function(card) {
            const lightLabel = card.querySelector('.switch-label span').textContent.toLowerCase();
            if (lightLabel.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.trim().toLowerCase();
        
        const cards = document.querySelectorAll('.light-card');

        cards.forEach(function(card) {
            const lightLabel = card.querySelector('.switch-label span').textContent.toLowerCase();
            if (lightLabel.includes(query)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
