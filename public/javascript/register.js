
const form = document.getElementById('registerForm');
const registerBtn = document.getElementById('registerBtn');
const msg = document.getElementById('msg');
const formToJSON = formData => Object.fromEntries(formData.entries());
form.addEventListener('submit', async function (e) {
    e.preventDefault(); // 阻止表单默认提交
    // 禁用提交按钮，防止重复提交
    registerBtn.disabled = true;
    // 获取表单数据
    const formData = new FormData(form);
    const jsonData = formToJSON(formData);

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