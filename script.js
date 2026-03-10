const scriptURL = 'https://script.google.com/macros/s/AKfycbwbHh9oIllYUauDRJ0-Ts7xWTzKt7EmSAxBKM2PlbSnVMLYyHogQEwsXjhcydmAo10Z/exec';

const form = document.getElementById('email-form');
const submitBtn = document.getElementById('submit-btn');
const message = document.getElementById('message');
const toast = document.getElementById('toast');

form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true;

    // 啟動光線進度條動畫
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
            本期原圖將透過 Email 交付。<br>
            請留意來自「視想家」的信件。<br>
            <span class="stay-visionary">Stay Visionary.</span>
        `;

        // 3秒後 Toast 消失
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 600);
        }, 3000);
    })
    .catch(error => {
        console.error('Error!', error.message);
        submitBtn.innerHTML = 'Error. Try Again.';
        submitBtn.disabled = false;
    });
});