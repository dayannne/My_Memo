let allMemo = JSON.parse(localStorage.getItem('allMemo')) || [];
render();

const currentDate = new Date();
let memoMonth = document.getElementById('memo-month');
let memoDate = document.getElementById('memo-date');
memoMonth.textContent = currentDate.getMonth() + 1;
memoDate.textContent = currentDate.getDate();

const memoForm = document.querySelector('.memo-form');
let memoFormBgImage = `bg${Math.floor(Math.random() * 10) + 1}.jpg`;
memoForm.style.backgroundImage = `url('./img/${memoFormBgImage}')`;

function saveNote() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const saveDate = currentDate.toDateString();
  const options = { hour12: false, hour: '2-digit', minute: '2-digit' };
  const saveTime = currentDate.toLocaleTimeString([], options);

  allMemo.push({
    title,
    content,
    bgImage: memoFormBgImage,
    len: allMemo.length,
    saveDate,
    saveTime,
  });

  render();
  memoFormBgImage = `bg${Math.floor(Math.random() * 10) + 1}.jpg`;
  memoForm.style.backgroundImage = `url('./img/${memoFormBgImage}')`;
  localStorage.setItem('allMemo', JSON.stringify(allMemo));
}

function render() {
  const display = document.getElementById('display');
  display.innerHTML = '';
  const titleIndex = document.getElementById('index');
  titleIndex.textContent = 1;
  allMemo.forEach((item, index) => {
    titleIndex.innerHTML = index + 2;
    const memoWrapper = document.createElement('div');
    memoWrapper.classList.add('memo-wrapper');
    memoWrapper.style.backgroundImage = `url('./img/${item.bgImage}')`;

    const deleteMemoBtn = document.createElement('button');
    deleteMemoBtn.addEventListener('click', () => remove(index));

    memoWrapper.innerHTML = `
    <div class="memo-header">
      <p><strong>${index + 1}</strong>번째</p>
      <h2>${item.title}</h2>
    </div>
    <div class="memo-datetime">
      <p class="memo-date">${item.saveDate}<p>
      <p class="memo-time">${item.saveTime}</p>
    </div>
    <p class="memo-content">${item.content}</p>
    `;

    deleteMemoBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg>`;

    deleteMemoBtn.dataset.index = index;
    memoWrapper.append(deleteMemoBtn);
    display.appendChild(memoWrapper);
  });
}

function remove(index) {
  allMemo.splice(index, 1);
  localStorage.setItem('allMemo', JSON.stringify(allMemo));
  render();
}
