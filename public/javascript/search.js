window.addEventListener('DOMContentLoaded', async () => {
    try {
        /*
        * JSON的body属性 需要包含season,tag,isfinish的key 
        如const test={
        season:"2025.4",
        tag:"恋爱",
        isfinish:0
        }
        body:JSON.parse(test)
        最后会返回一个列表 列表的每个元素是一个字典 包含了表bangumi_info中符合筛选条件的所有信息 
        * */
        const res = await fetch('/searchbytag', { method: 'POST',body:JSON.parse()});
        const result = await res.json();
    } catch (err) {
        console.error(err);
    }
});