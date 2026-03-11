const scriptURL = 'https://script.google.com/macros/s/AKfycbwbHh9oIllYUauDRJ0-Ts7xWTzKt7EmSAxBKM2PlbSnVMLYyHogQEwsXjhcydmAo10Z/exec';
const form = document.getElementById('email-form');
const submitBtn = document.getElementById('submit-btn');
const toast = document.getElementById('toast');

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) { window.requestAnimationFrame(step); }
    };
    window.requestAnimationFrame(step);
}

window.addEventListener('DOMContentLoaded', () => {
    const counterObj = document.getElementById('member-count');
    animateValue(counterObj, 0, 312, 2000);
});

form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<div class="shimmer"></div><span style="position: relative; z-index: 1;">Connecting...</span>`;

    fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(new FormData(form)) })
    .then(() => {
        // 彈出 Toast
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('show'), 100);

        // 修改按鈕狀態為 SUCCESS
        submitBtn.innerHTML = 'SUCCESS';
        submitBtn.style.backgroundColor = '#4cd964'; // 變更為成功綠（可選，或維持黑色）
        form.reset(); // 清空輸入框

        // 4秒後收起 Toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 600);
            // 恢復按鈕文字 (可選)
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