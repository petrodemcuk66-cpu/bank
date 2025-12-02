const API_BASE_URL = 'http://127.0.0.1:5000/api'; 
let currentTicketId = 'standard'; 
function closeModals() {
    const modal = document.getElementById('modal-registration');
    modal.classList.remove('active');
    const form = document.getElementById('registrationForm');
    if (form) form.reset();
    document.getElementById('status-reg').innerText = '';
    document.getElementById('loader-reg').style.display = 'none';
    document.querySelector('#registrationForm button[type="submit"]').style.display = 'block';
}
function handleModalOpen(e) {
    e.preventDefault();
    closeModals(); 
    const modal = document.getElementById('modal-registration');
    const ticketId = e.currentTarget.getAttribute('data-ticket-id') || 'standard';
    currentTicketId = ticketId;
    let ticketName = "Standard Pass";
    if (ticketId === 'vip') {
        ticketName = "VIP Access";
    }
    document.getElementById('selected-ticket-name').innerText = `Обрано: ${ticketName}`;
    modal.classList.add('active');
}
document.addEventListener('DOMContentLoaded', () => {
    const openButtons = document.querySelectorAll('[data-modal-target="registration"]');
    openButtons.forEach(button => {
        button.addEventListener('click', handleModalOpen);
    });
    document.querySelector('[data-modal-close]').addEventListener('click', closeModals);
    document.getElementById('modal-registration').addEventListener('click', (e) => {
        if (e.target.id === 'modal-registration') {
            closeModals();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModals();
        }
    });
    document.getElementById('registrationForm')?.addEventListener('submit', handleRegistration);
});
async function handleRegistration(e) {
    e.preventDefault();
    const form = e.target;
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const btn = form.querySelector('button');
    const loader = document.getElementById('loader-reg');
    const status = document.getElementById('status-reg');
    btn.style.display = 'none';
    loader.style.display = 'block';
    status.className = 'status-msg';
    status.innerText = 'Обробка, перевірка даних...';
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (name.toLowerCase().includes('тест')) { 
        status.className = 'status-msg error';
        status.innerText = '⚠️ Помилка: Ім\'я не пройшло валідацію. Спробуйте інше.';
        btn.style.display = 'block';
    } else {
        status.className = 'status-msg success';
        status.innerText = ` Реєстрація успішна! Квиток "${currentTicketId.toUpperCase()}" заброньовано. Перевірте ${email}`;
        setTimeout(closeModals, 2000); 
    }
    loader.style.display = 'none';
}
const todoInput = document.getElementById('todoInput');
const addTodo = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
const activeCount = document.getElementById('activeCount');
const clearDone = document.getElementById('clearDone');
addTodo.onclick = () => {
    if (!todoInput.value.trim()) return;
    const li = document.createElement('li');
    li.innerHTML = `
        ${todoInput.value}
        <span onclick="this.parentElement.classList.toggle('done'); updateCount()">✓</span>
        <span onclick="this.parentElement.remove(); updateCount()">×</span>
    `;
    todoList.appendChild(li);
    todoInput.value = '';
    updateCount();
};
clearDone.onclick = () => {
    document.querySelectorAll('.done').forEach(el => el.remove());
    updateCount();
};
function updateCount() {
    const active = todoList.querySelectorAll('li:not(.done)').length;
    activeCount.textContent = active;
}
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const caption = document.getElementById('caption');
const images = document.querySelectorAll('.gallery img');
let currentIndex = 0;
images.forEach((img, i) => {
    img.onclick = () => {
        modal.style.display = 'flex';
        modalImg.src = img.src.replace(/300\/200/, '800/600');
        caption.innerHTML = img.getAttribute('data-desc');
        currentIndex = i;
    };
});
document.querySelector('.close').onclick = () => modal.style.display = 'none';
document.querySelector('.prev').onclick = () => changeImage(-1);
document.querySelector('.next').onclick = () => changeImage(1);
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
window.onkeydown = (e) => { if (e.key === 'Escape') modal.style.display = 'none'; };
function changeImage(n) {
    currentIndex = (currentIndex + n + images.length) % images.length;
    const img = images[currentIndex];
    modalImg.src = img.src.replace(/300\/200/, '800/600');
    caption.innerHTML = img.getAttribute('data-desc');
}
document.getElementById('addField').onclick = () => {
    const type = document.getElementById('fieldType').value;
    const label = document.getElementById('fieldLabel').value || 'Поле';
    const div = document.createElement('div');
    div.innerHTML = `
        <label>${label}:
            <input type="${type}" name="${label.toLowerCase()}">
            <button type="button" onclick="this.parentElement.parentElement.remove()">×</button>
        </label><br><br>
    `;
    document.getElementById('dynamicForm').appendChild(div);
};
document.getElementById('exportForm').onclick = () => {
    const form = document.getElementById('dynamicForm');
    const data = {};
    new FormData(form).forEach((value, key) => data[key] = value);
    console.log(JSON.stringify(data, null, 2));
    alert("Форма експортована в консоль (F12) як JSON!");
};
document.getElementById('addRow').onclick = () => {
    const row = document.createElement('tr');
    row.innerHTML = `<td contenteditable>Новий</td><td contenteditable>0</td><td contenteditable>Місто</td><td><button class="del">×</button></td>`;
    document.querySelector('#dataTable tbody').appendChild(row);
};
document.getElementById('searchTable').oninput = (e) => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('#dataTable tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(term) ? '' : 'none';
    });
};
document.querySelector('#dataTable').addEventListener('click', (e) => {
    if (e.target.classList.contains('del')) {
        e.target.closest('tr').remove();
    }
});
function sortTable(n) {
    let table = document.getElementById("dataTable");
    let rows, switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (let i = 1; i < (rows.length - 1); i++) {
            if (rows[i].getElementsByTagName("TD")[n].innerHTML.toLowerCase() > rows[i + 1].getElementsByTagName("TD")[n].innerHTML.toLowerCase()) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }
}
