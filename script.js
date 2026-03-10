const scriptURL = 'https://script.google.com/macros/s/AKfycbwbHh9oIllYUauDRJ0-Ts7xWTzKt7EmSAxBKM2PlbSnVMLYyHogQEwsXjhcydmAo10Z/exec';

const form = document.getElementById('email-form');
const submitBtn = document.getElementById('submit-btn');
const message = document.getElementById('message');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // 讓按鈕顯示處理中
    submitBtn.innerText = 'Connecting...';
    submitBtn.disabled = true;

    fetch(scriptURL, { 
        method: 'POST', 
        mode: 'no-cors', 
        body: new URLSearchParams(new FormData(form)) 
    })
    .then(() => {
        // 隱藏輸入框和按鈕
        form.classList.add('hidden');
        
        // 顯示高質感的成功訊息內容
        message.classList.remove('hidden');
        message.innerHTML = `
            <span class="success-title">成功訂閱</span>
            本期高清原圖與週報將於近期透過 Email 交付。<br>
            請留意來自「視想家」的信件。<br>
            <span class="stay-visionary">Stay Visionary.</span>
        `;
    })
    .catch(error => {
        console.error('Error!', error.message);
        submitBtn.innerText = 'Error. Try Again.';
        submitBtn.disabled = false;
    });
});