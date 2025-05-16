window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/is_login', { method: 'POST', credentials: 'include' });
        const result = await res.json();
        if (result.code === 200) {
            showLoggedInUI(result.nickname);
        } else {
            showLoggedOutUI();
        }
    } catch (err) {
        console.error('登录状态检测失败', err);
    }
});

function showLoggedInUI(nickname) {
    document.querySelector('.button-group').style.display = 'none';
    document.getElementById('welcomeArea').style.display = 'inline';
    document.getElementById('userNickname').textContent = nickname;
}

function showLoggedOutUI() {
    document.getElementById('button-group').style.display = 'inline';
    document.getElementById('welcomeArea').style.display = 'none';
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
  try {
    const response = await fetch('/log_out', {
      method: 'POST',
      credentials: 'include'
    });
    if (response.redirected) {
      window.location.href = response.url;
    } else {
      const result = await response.text();
      console.log(result);
    }
  } catch (error) {
    console.error('登出失败:', error);
    alert('登出失败，请稍后再试');
  }
});

