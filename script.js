(function () {
const input = document.getElementById('myInput');
const addBtn = document.querySelector('.addBtn');
const ul = document.getElementById('myUL');
const STORAGE_KEY = 'todos_v1';

function liText(li) {
    const clone = li.cloneNode(true);
    clone.querySelectorAll('span, .close').forEach(n => n.remove());
    return clone.textContent.trim();
}

function saveTodos() {
    const items = Array.from(ul.querySelectorAll('li')).map(li => ({
        text: liText(li),
        done: li.classList.contains('checked')
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function createLi(text, done = false) {
    const li = document.createElement('li');
    li.textContent = text;

    if (done) li.classList.add('checked');

    const close = document.createElement('span');
    close.className = 'close';
    close.textContent = '×';
    close.title = 'Delete';
    li.appendChild(close);

    return li;
}

function renderFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    try {
        const items = JSON.parse(raw);
        ul.innerHTML = '';
        items.forEach(it => ul.appendChild(createLi(it.text, it.done)));
        return true;
    } catch (e) {
        console.error('Failed to parse todos:', e);
        return false;
    }
}

function seedFromExistingHTML() {
    const existing = Array.from(ul.querySelectorAll('li')).map(li => ({
        text: liText(li),
        done: li.classList.contains('checked')
    })).filter(i => i.text.length);
    if (existing.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    }
}

function addTodo(text) {
    text = text.trim();
    if (!text) return;
    ul.appendChild(createLi(text));
    input.value = '';
    saveTodos();
}


if (!renderFromStorage()) seedFromExistingHTML();
renderFromStorage();


addBtn.addEventListener('click', () => addTodo(input.value));
input.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTodo(input.value);
});


ul.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('close')) {
        const li = target.parentElement;
        li.remove();
        saveTodos();
        return;
    }

    
    const li = target.tagName === 'LI' ? target : target.closest('li');
    if (!li) return;
    li.classList.toggle('checked');
    saveTodos();
});

})();