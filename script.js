const scriptURL = 'https://script.google.com/macros/s/AKfycbz7coREPcdi9ntyR_xQZmoMpQbRP7HXqKMnDFZN02m0lrznif3Vh2IcFoi-jbkZSCt6/exec';

const form = document.getElementById('email-form');
const submitBtn = document.getElementById('submit-btn');
const toast = document.getElementById('toast');

// 計數器滾動：設定初始目標為 149
function rollSlot(id, target, delay) {
    const column = document.querySelector(`#${id} .slot-numbers`);
    const baseUnit = 1.0 * parseFloat(getComputedStyle(document.documentElement).fontSize);
    setTimeout(() => {
        column.style.transform = `translateY(-${target * baseUnit}px)`;
    }, delay);
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        rollSlot('slot-1', 1, 400); 
        rollSlot('slot-2', 4, 900); 
        rollSlot('slot-3', 9, 1400); 
    }, 600);
});

form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<div class="shimmer"></div><span style="position: relative; z-index: 1;">Connecting...</span>`;

    const email = document.getElementById('email').value;

    fetch(scriptURL, { 
        method: 'POST', 
        mode: 'no-cors', 
        body: JSON.stringify({ email: email, igHandle: "Invisible_Empire_Member" }) 
    })
    .then(() => {
        // 顯示帶有勾勾的成功 Toast
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('show'), 50);
        
        submitBtn.innerHTML = 'SUCCESS';
        submitBtn.style.backgroundColor = '#0a1931'; 
        
        // 1.5 秒後自動跳轉至你的正式 Skool 社群
        setTimeout(() => {
            window.location.href = "https://www.skool.com/invisible-empire-1861/about?ref=f4cb24922ca24ec1ab837c0278ef3b69"; 
        }, 1500);
    })
    .catch(error => {
        console.error('Error!', error.message);
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'NOW OR NEVER';
    });
});