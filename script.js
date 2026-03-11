const scriptURL = 'https://script.google.com/macros/s/AKfycbwbHh9oIllYUauDRJ0-Ts7xWTzKt7EmSAxBKM2PlbSnVMLYyHogQEwsXjhcydmAo10Z/exec';
const form = document.getElementById('email-form');
const submitBtn = document.getElementById('submit-btn');
const toast = document.getElementById('toast');

function rollSlot(id, target, delay) {
    const column = document.querySelector(`#${id} .slot-numbers`);
    // 取得 CSS 的 1rem 作為位移單位
    const baseUnit = 1.0 * parseFloat(getComputedStyle(document.documentElement).fontSize);

    setTimeout(() => {
        column.style.transform = `translateY(-${target * baseUnit}px)`;
    }, delay);
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        rollSlot('slot-1', 3, 400); 
        rollSlot('slot-2', 1, 900); // 增加啟動間隔
        rollSlot('slot-3', 2, 1400); 
    }, 600);
});

form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<div class="shimmer"></div><span style="position: relative; z-index: 1;">Connecting...</span>`;

    fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(new FormData(form)) })
    .then(() => {
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('show'), 50);
        submitBtn.innerHTML = 'SUCCESS';
        submitBtn.style.backgroundColor = '#4cd964';
        form.reset();
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 500);
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'NOW OR NEVER';
            submitBtn.style.backgroundColor = '#000';
        }, 4000);
    })
    .catch(error => {
        console.error('Error!', error.message);
        submitBtn.innerHTML = 'NOW OR NEVER';
        submitBtn.disabled = false;
    });
});