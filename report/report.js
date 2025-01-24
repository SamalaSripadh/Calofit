window.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const report = urlParams.get('report');
    displayReport(report);
});

function displayReport(report) {
    const reportContainer = document.getElementById('reportContainer');

    if (reportContainer && report) {
        reportContainer.innerHTML = `<p>${report}</p>`;
    } else {
        reportContainer.innerHTML = '<p>No report data available.</p>';
    }
}
