// Mendapatkan referensi ke elemen-elemen HTML
const dataForm = document.getElementById('data-form');
const dataInput = document.getElementById('data-input');
const dataList = document.getElementById('data-list');

// Mengambil data dari localStorage saat aplikasi dimuat
const storedData = JSON.parse(localStorage.getItem('data')) || [];

// Fungsi untuk menambahkan data ke localStorage dan tampilkan ke layar
function addData(event) {
    event.preventDefault();

    const newData = dataInput.value.trim();

    if (newData) {
        storedData.push(newData);
        localStorage.setItem('data', JSON.stringify(storedData));

        dataInput.value = '';
        displayData();
    }
}

// Fungsi untuk menampilkan data dari localStorage ke layar
function displayData() {
    dataList.innerHTML = '';

    storedData.forEach((data, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = data;
        dataList.appendChild(listItem);
    });
}

// Event listener untuk saat formulir dikirim
dataForm.addEventListener('submit', addData);

// Tampilkan data saat aplikasi dimuat
displayData();
