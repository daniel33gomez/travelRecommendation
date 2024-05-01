const resetBtn = document.getElementById('resetBtn');
const searchInput = document.getElementById('searchInput');

resetBtn.addEventListener('click', () => (searchInput.value = ''));
