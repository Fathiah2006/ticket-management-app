// public/js/app.js
function showToast(msg, type='success') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span>${msg}</span><button class="toast-close" onclick="this.parentNode.remove()">×</button>`;
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), 4000);
}
