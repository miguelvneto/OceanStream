function downloadData(format) {
    const form = document.getElementById('download-form');
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        if (!data[key]) {
            data[key] = value;
        } else {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }
            data[key].push(value);
        }
    });

    const startDate = data['start-date'];
    const endDate = data['end-date'];
    const equipments = data['equipments'];
    const magnitudes = {};

    form.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        const nameParts = checkbox.name.split('-');
        const equipment = nameParts[0];
        const magnitude = checkbox.value;

        if (nameParts.length > 1) {
            if (!magnitudes[equipment]) {
                magnitudes[equipment] = [];
            }
            magnitudes[equipment].push(magnitude);
        }
    });

    const requestData = {
        startDate,
        endDate,
        equipments: equipments ? (Array.isArray(equipments) ? equipments : [equipments]) : [],
        magnitudes
    };

    console.log('Data to export:', requestData);
    alert(`Exporting data as ${format.toUpperCase()}`);
    // Add AJAX request to your server here to generate and download the file
}

function toggleOptions(id) {
    const options = document.getElementById(id);
    options.classList.toggle('show');
}

function toggleAll(id, checkbox) {
    const options = document.getElementById(id);
    const checkboxes = options.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((cb) => {
        cb.checked = checkbox.checked;
    });
    toggleOptions(id)
}

function downloadData(format) {
    // Implement your download logic here
}