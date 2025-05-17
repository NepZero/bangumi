const form = document.getElementById('registerForm');
const registerBtn = document.getElementById('registerBtn');
const msg = document.getElementById('msg');
const formToJSON = formData => Object.fromEntries(formData.entries());
const passwordInput = document.querySelector('input[name="password"]');
const strengthMsg = document.createElement('div');
strengthMsg.id = 'passwordStrength';
passwordInput.parentNode.appendChild(strengthMsg);
function evaluatePasswordStrength(password) {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8) {
        return { level: '至少8位', color: 'red' };
    }

    if (hasNumbers && !hasLetters && !hasSymbols) {
        return { level: '弱', color: 'red' };
    } else if (hasNumbers && hasLetters && !hasSymbols) {
        return { level: '中', color: 'orange' };
    } else if (hasNumbers && hasLetters && hasSymbols) {
        return { level: '强', color: 'green' };
    } else {
        return { level: '弱', color: 'red' };
    }
}

passwordInput.addEventListener('input', function () {
    const password = passwordInput.value;
    const strength = evaluatePasswordStrength(password);
    strengthMsg.textContent = `密码强度：${strength.level}`;
    strengthMsg.style.color = strength.color;
});
form.addEventListener('submit', async function (e) {
    e.preventDefault(); // 阻止表单默认提交
    // 禁用提交按钮，防止重复提交
    registerBtn.disabled = true;
    // 获取表单数据
    const formData = new FormData(form);
    const jsonData = formToJSON(formData);
    const password = formData.get('password');
    const strength = evaluatePasswordStrength(password);

    if (password.length < 8) {
        msg.style.color = 'red';
        msg.textContent = '密码至少需要8位';
        return;
    }

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        });

        const result = await response.json();

        if (result.code === 200) {
            msg.style.color = 'green';
            msg.textContent = '注册成功！3秒后跳转首页...';
            setTimeout(() => {
            window.location.href = '/index';  // 登录成功跳首页
            registerBtn.disabled=false;
          }, 3000);
        } else {
            registerBtn.disabled=false;
            msg.style.color = 'red';
            msg.textContent = `错误：${result.error || '未知错误'}`;
        }
      } catch (error) {
        registerBtn.disabled=false;
        msg.style.color = 'red';
        msg.textContent = '请求异常，请稍后重试';
        console.error(error);
      }
});