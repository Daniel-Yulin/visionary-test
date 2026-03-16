const scriptURL = 'https://script.google.com/macros/s/AKfycbwbHh9oIllYUauDRJ0-Ts7xWTzKt7EmSAxBKM2PlbSnVMLYyHogQEwsXjhcydmAo10Z/exec';
const form = document.getElementById('email-form');
const submitBtn = document.getElementById('submit-btn');
const toast = document.getElementById('toast');

// --- 新增：自動從網址抓取 IG 帳號 ---
const urlParams = new URLSearchParams(window.location.search);
const igHandleFromUrl = urlParams.get('ig') || '未透過IG進入'; 

function rollSlot(id, target, delay) {
    const column = document.querySelector(`#${id} .slot-numbers`);
    const baseUnit = 1.0 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    setTimeout(() => {
        column.style.transform = `translateY(-${target * baseUnit}px)`;
    }, delay);
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        rollSlot('slot-1', 3, 400); 
        rollSlot('slot-2', 1, 900); 
        rollSlot('slot-3', 2, 1400); 
    }, 600);
});

form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<div class="shimmer"></div><span style="position: relative; z-index: 1;">Connecting...</span>`;

    const email = document.getElementById('email').value;

    // 傳送 Email + 自動抓到的 IG 帳號
    fetch(scriptURL, { 
        method: 'POST', 
        mode: 'no-cors', 
        body: JSON.stringify({ 
            email: email, 
            igHandle: igHandleFromUrl 
        }) 
    })
    .then(() => {
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('show'), 50);
        
        submitBtn.innerHTML = 'SUCCESS';
        submitBtn.style.backgroundColor = '#0a1931'; 
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