const scriptURL = 'https://script.google.com/macros/s/AKfycbwbHh9oIllYUauDRJ0-Ts7xWTzKt7EmSAxBKM2PlbSnVMLYyHogQEwsXjhcydmAo10Z/exec';

const form = document.getElementById('email-form');
const submitBtn = document.getElementById('submit-btn');
const message = document.getElementById('message');
const toast = document.getElementById('toast');

// --- 數字滾動動畫 ---
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

window.addEventListener('DOMContentLoaded', () => {
    const counterObj = document.getElementById('member-count');
    animateValue(counterObj, 0, 312, 2000); // 抓一個大約 300 左右的數字
});

// --- 表單提交邏輯 ---
form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true;

    // 啟動光條與 Loading 文字
    submitBtn.innerHTML = `
        <div class="shimmer"></div>
        <span style="position: relative; z-index: 1;">Connecting...</span>
    `;

    fetch(scriptURL, { 
        method: 'POST', 
        mode: 'no-cors', 
        body: new URLSearchParams(new FormData(form)) 
    })
    .then(() => {
        // 顯示頂部成功 Toast
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('show'), 100);

        // 切換主畫面成功訊息
        form.classList.add('hidden');
        message.classList.remove('hidden');
        message.innerHTML = `
            <span class="success-title">成功訂閱</span>
            本期動力原圖將透過 Email 交付。<br>
            請留意來自「視想家」的信件。
        `;

        // 3秒後 Toast 消失
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 600);
        }, 3000);
    })
    .catch(error => {
        console.error('Error!', error.message);
        submitBtn.innerHTML = '立即訂閱';
        submitBtn.disabled = false;
    });
});