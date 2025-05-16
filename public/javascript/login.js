const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');
function isEmail(email)
{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
form.addEventListener('submit', async (event) =>
{
  event.preventDefault(); // 阻止表单默认提交行为（页面刷新）
  const formData = new FormData(form);
  const user = formData.get('user');
  const password = formData.get('password');
  const checkbox = formData.get('checkbox'); // 如果勾选，值是 "on"，否则是 null
  const searchType = isEmail(user) ? 'email' : 'nickname';
  const payload = {
    user: user,
    password: password,
    checkbox: checkbox,
    searchType: searchType
  };

  try
  {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.code === 200)
    {
      msg.style.color = 'green';
      msg.textContent = '登录成功！3秒后跳转首页...';
      setTimeout(() =>
      {
        window.location.href = '/index';  // 登录成功跳首页
      }, 3000);
    } else
    {
      msg.style.color = 'red';
      msg.textContent = `错误：${result.error || '未知错误'}`;
    }
  } catch (error)
  {
    msg.style.color = 'red';
    msg.textContent = '请求异常，请稍后重试';
    console.error(error);
  }
});