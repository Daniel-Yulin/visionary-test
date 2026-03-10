const scriptURL = 'https://script.google.com/macros/s/AKfycbwbHh9oIllYUauDRJ0-Ts7xWTzKt7EmSAxBKM2PlbSnVMLYyHogQEwsXjhcydmAo10Z/exec';

const form = document.getElementById('email-form');
const submitBtn = document.getElementById('submit-btn');
const message = document.getElementById('message');

form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.innerText = 'Connecting...';
    submitBtn.disabled = true;

    fetch(scriptURL, { 
        method: 'POST', 
        mode: 'no-cors', 
        body: new URLSearchParams(new FormData(form)) 
    })
    .then(() => {
        form.classList.add('hidden');
        message.classList.remove('hidden');
        message.innerHTML = `
            <span class="success-title">成功訂閱</span>
            本期原圖與週報將透過 Email 交付。<br>
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