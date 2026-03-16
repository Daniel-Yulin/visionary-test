const scriptURL = 'https://script.google.com/macros/s/AKfycbz7coREPcdi9ntyR_xQZmoMpQbRP7HXqKMnDFZN02m0lrznif3Vh2IcFoi-jbkZSCt6/exec';

const form = document.getElementById('email-form');
const submitBtn = document.getElementById('submit-btn');
const toast = document.getElementById('toast');

// 2. 自動從網址抓取 IG 帳號參數 (?ig=xxxx)
const urlParams = new URLSearchParams(window.location.search);
const igHandleFromUrl = urlParams.get('ig') || '未透過IG進入'; 

// --- Slot Machine 計數器動畫邏輯 ---
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

// --- 表單提交邏輯 ---
form.addEventListener('submit', e => {
    e.preventDefault();
    
    // 按鈕進入讀取狀態
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<div class="shimmer"></div><span style="position: relative; z-index: 1;">Connecting...</span>`;

    const emailValue = document.getElementById('email').value;

    // 使用 JSON 格式傳送資料，確保欄位對應正確
    const payload = {
        email: emailValue,
        igHandle: igHandleFromUrl
    };

    fetch(scriptURL, { 
        method: 'POST', 
        mode: 'no-cors', // 避免跨域問題
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) 
    })
    .then(() => {
        // 成功後的視覺回饋
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('show'), 50);
        
        submitBtn.innerHTML = 'SUCCESS';
        submitBtn.style.backgroundColor = '#0a1931'; 
        form.reset();
        
        // 4秒後恢復按鈕狀態
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
        alert('連線失敗，請檢查網路後再試一次');
        submitBtn.innerHTML = 'NOW OR NEVER';
        submitBtn.disabled = false;
    });
});