async function fetchData() //异步函数 对返回的数据的操作写在此函数内
{
    try
    {
        console.log(111);
        fetchA = fetch('/week_table', { method: 'POST', headers: { 'Content-Type': 'application/json'} }).then(response => response.json()); //请求头可添加多个
        const responseA = await fetchA; //异步请求数据 返回响应
        console.log(responseA);
    }
    catch (error)
    {
        console.error('请求失败:', error);
    }

}

fetchData();