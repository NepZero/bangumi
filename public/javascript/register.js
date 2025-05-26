const form = document.getElementById('registerForm');
const registerBtn = document.getElementById('registerBtn');
const msg = document.getElementById('msg');
const formToJSON = formData => Object.fromEntries(formData.entries());
const passwordInput = document.querySelector('input[name="password"]');
const strengthMsg = document.createElement('div');
strengthMsg.id = 'passwordStrength';
passwordInput.parentNode.appendChild(strengthMsg);
function evaluatePasswordStrength(password)
{
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8)
    {
        return { level: '至少8位', color: 'red' };
    }

    if (hasNumbers && !hasLetters && !hasSymbols)
    {
        return { level: '弱', color: 'red' };
    } else if (hasNumbers && hasLetters && !hasSymbols)
    {
        return { level: '中', color: 'orange' };
    } else if (hasNumbers && hasLetters && hasSymbols)
    {
        return { level: '强', color: 'green' };
    } else
    {
        return { level: '弱', color: 'red' };
    }
}

passwordInput.addEventListener('input', function ()
{
    const password = passwordInput.value;
    const strength = evaluatePasswordStrength(password);
    strengthMsg.textContent = `密码强度：${strength.level}`;
    strengthMsg.style.color = strength.color;
});
form.addEventListener('submit', async function (e)
{
    e.preventDefault(); // 阻止表单默认提交
    // 禁用提交按钮，防止重复提交
    registerBtn.disabled = true;
    // 获取表单数据
    const formData = new FormData(form);
    const jsonData = formToJSON(formData);
    const password = formData.get('password');
    const strength = evaluatePasswordStrength(password);

    if (password.length < 8)
    {
        msg.style.color = 'red';
        msg.textContent = '密码至少需要8位';
        return;
    }

    try
    {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        });

        const result = await response.json();

        if (result.code === 200)
        {
            msg.style.color = 'green';
            msg.textContent = '注册成功！3秒后跳转首页...';
            setTimeout(() =>
            {
                window.location.href = '/index';  // 登录成功跳首页
                registerBtn.disabled = false;
            }, 3000);
        } else
        {
            registerBtn.disabled = false;
            msg.style.color = 'red';
            msg.textContent = `错误：${result.error || '未知错误'}`;
        }
    } catch (error)
    {
        registerBtn.disabled = false;
        msg.style.color = 'red';
        msg.textContent = '请求异常，请稍后重试';
        console.error(error);
    }
});

function more_season()
{
    var body = document.body;
    var more = document.getElementsByClassName("more")[0];
    var more_div = document.createElement('div');
    var more_flag = 0;
    var season_div = ['2025.4', '2025.1', '2024.10', '2024.7', '2024.4', '2024.1', '2023.10', '2023.7', '2023.4', '2023.1'];
    var season_cards = [];

    more.onclick = function ()
    {
        if (more_flag == 0)
        {
            more_flag = 1;
            more_div.style.height = '10vw';
            more_div.style.width = '7vw';
            // more_div.style.backgroundColor = 'blue';
            more_div.style.position = 'fixed';
            more_div.style.top = '3vw';
            more_div.style.left = '27%';
            more_div.style.zIndex = '500';
            more_div.style.overflowY = 'auto';
            more_div.style.borderRadius = "0.5vw";
            more_div.style.display = 'flex';
            more_div.style.flexDirection = 'column';
            more_div.style.gap = '2px';
            more_div.style.backdropFilter = 'blur(10px)';
            more_div.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            body.appendChild(more_div);

            for (var i = 0; i < season_div.length; i++)
            {
                season_cards[i] = document.createElement('div');
                season_cards[i].style.height = '1vw';
                season_cards[i].style.width = '100%';
                season_cards[i].innerHTML = season_div[i].slice(0, 4) + '年' + season_div[i].slice(5) + '月';
                season_cards[i].className = season_div[i];
                season_cards[i].style.fontSize = '0.8vw';
                more_div.appendChild(season_cards[i]);
                more_div.style.textAlign = "center";
                more_div.style.cursor = 'pointer';

                season_cards[i].onmouseover = function ()
                {
                    this.style.backgroundColor = 'rgb(139,139,139)';
                }
                season_cards[i].onmouseout = function ()
                {
                    this.style.backgroundColor = '';
                }
                season_cards[i].onclick = function ()
                {
                    // 创建并提交表单
                    const season = encodeURIComponent(this.className);
                    window.location.href = `/archive?season=${season}`;
                }
            }
        }
        else
        {
            more_flag = 0;
            body.removeChild(more_div);

        }
    }
}
more_season();