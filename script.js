function calculateChange() {
  // Ambil input jumlah kembalian dan pecahan uang
  const amountInput = document.getElementById("amount").value;
  const denominationsInput = document.getElementById("denominations").value;

  // Ambil elemen result box
  const resultBox = document.getElementById("result");

  // Validasi input
  if (!amountInput || !denominationsInput) {
    resultBox.innerHTML = "Harap masukkan jumlah kembalian dan pecahan uang!";
    resultBox.style.display = "block"; // Tampilkan kotak hasil
    return;
  }

  let amount = parseInt(amountInput);
  const denominations = denominationsInput.split(",").map(Number).sort((a, b) => b - a);

  // Validasi apakah amount dan denominations valid
  if (isNaN(amount) || amount <= 0 || denominations.some(isNaN)) {
    resultBox.innerHTML = "Input tidak valid. Harap masukkan angka yang benar.";
    resultBox.style.display = "block"; // Tampilkan kotak hasil
    return;
  }

  // Menghitung kembalian menggunakan algoritma greedy
  const result = [];
  for (let i = 0; i < denominations.length; i++) {
    const coin = denominations[i];
    if (amount >= coin) {
      const count = Math.floor(amount / coin);
      result.push(`${count} x Rp${coin}`);
      amount -= count * coin;
    }
  }

  // Menampilkan hasil
  if (amount > 0) {
    resultBox.innerHTML = "Kembalian tidak dapat diselesaikan dengan pecahan yang tersedia.";
  } else {
    resultBox.innerHTML = `<b>Kembalian:</b><br>${result.join("<br>")}`;
  }

  resultBox.style.display = "block"; // Menampilkan hasil kembalian
}

// Event listener untuk menaikkan nilai input 'amount' sebesar 500
const amountInput = document.getElementById('amount');
amountInput.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowUp') {
    let currentValue = parseInt(this.value) || 0;
    this.value = currentValue + 500;
    event.preventDefault();  // Mencegah aksi default untuk ArrowUp
  } else if (event.key === 'ArrowDown') {
    let currentValue = parseInt(this.value) || 0;
    this.value = Math.max(0, currentValue - 500);
    event.preventDefault();  // Mencegah aksi default untuk ArrowDown
  }
});
