var bangumi_informations = [
    { "name": "精灵幻想记 第二季", "screening": "周二00:30", "platform": "bilibili", "start_time": "2024.10.7", "episodes": 24, "isfinish": 1, "tags": "奇幻 / 冒险 / 战斗 / 后宫 / 穿越异世界" },
    { "name": "重生大小姐正在攻略龙帝殿下", "screening": "周三12:30", "platform": null, "start_time": "2024.1.7", "episodes": 12, "isfinish": 0, "tags": "奇幻 / 冒险 / 战斗 / 后宫 / 穿越异世界" }
]
var bangumicards_box = document.getElementsByClassName("bangumicards-box")[0];
var bangumicard = [];


function Init()
{
    for (var i = 1; i <= bangumi_informations.length; i++)
    {
        bangumicard[i] = document.createElement('div');
        bangumicard[i].style.width = "40%";
        bangumicard[i].style.height = "8vw";
        bangumicard[i].style.position = "relative";
        bangumicard[i].style.backgroundColor = "red";
        bangumicard[i].style.margin = "1vw auto";
        bangumicard[i].style.borderRadius = "0.5vw";
        bangumicards_box.appendChild(bangumicard[i]);

        bangumicard_image = document.createElement('div');
        bangumicard_image.style.height = "100%";
        bangumicard_image.style.width = "20%";
        bangumicard_image.style.position = "absolute";
        bangumicard_image.style.backgroundColor = "white";
        bangumicard_image.style.borderRadius = "0.5vw";
        bangumicard[i].appendChild(bangumicard_image);

        bangumicard_header = document.createElement('div');
        bangumicard_header.style.height = "30%";
        bangumicard_header.style.width = "80%";
        bangumicard_header.style.position = "absolute";
        bangumicard_header.style.backgroundColor = "blue";
        bangumicard_header.style.left = "20%";
        bangumicard_header.style.top = "5%";
        bangumicard_header.innerHTML = bangumi_informations[i - 1]["banguminame"];
        bangumicard_header.style.textAlign = "center";
        bangumicard_header.style.fontSize = "1.5vw";
        bangumicard[i].appendChild(bangumicard_header);

        bangumicard_time = document.createElement('div');
        bangumicard_time.style.height = "20%";
        bangumicard_time.style.width = "20%";
        bangumicard_time.style.position = "absolute";
        bangumicard_time.style.backgroundColor = "yellow";
        bangumicard_time.style.left = "20%";
        bangumicard_time.style.top = "45%";
        bangumicard_time.style.textAlign = "center";
        bangumicard_time.innerHTML = bangumi_informations[i - 1]["screening"];
        bangumicard_time.style.fontSize = "1vw";
        bangumicard[i].appendChild(bangumicard_time);

        bangumicard_platform = document.createElement('div');
        bangumicard_platform.style.height = "20%";
        bangumicard_platform.style.width = "20%";
        bangumicard_platform.style.position = "absolute";
        bangumicard_platform.style.backgroundColor = "yellow";
        bangumicard_platform.style.left = "45%";
        bangumicard_platform.style.top = "45%";
        bangumicard_platform.style.textAlign = "center";
        if (bangumi_informations[i - 1]["platform"])
            bangumicard_platform.innerHTML = "大陆: " + bangumi_informations[i - 1]["platform"];
        else
            bangumicard_platform.innerHTML = "大陆: " + "暂无";
        bangumicard_platform.style.fontSize = "1vw";
        bangumicard[i].appendChild(bangumicard_platform);

        bangumicard_episodes = document.createElement('div');
        bangumicard_episodes.style.height = "20%";
        bangumicard_episodes.style.width = "20%";
        bangumicard_episodes.style.position = "absolute";
        bangumicard_episodes.style.backgroundColor = "yellow";
        bangumicard_episodes.style.left = "45%";
        bangumicard_episodes.style.top = "75%";
        bangumicard_episodes.style.textAlign = "center";
        bangumicard_episodes.innerHTML = "集数: " + bangumi_informations[i - 1]["episodes"];
        bangumicard_episodes.style.fontSize = "1vw";
        bangumicard[i].appendChild(bangumicard_episodes);

        bangumicard_isfinish = document.createElement('div');
        bangumicard_isfinish.style.height = "20%";
        bangumicard_isfinish.style.width = "25%";
        bangumicard_isfinish.style.position = "absolute";
        bangumicard_isfinish.style.backgroundColor = "yellow";
        bangumicard_isfinish.style.left = "70%";
        bangumicard_isfinish.style.top = "45%";
        bangumicard_isfinish.style.textAlign = "center";
        if (bangumi_informations[i - 1]["isfinish"] == 1)
            bangumicard_isfinish.innerHTML = "已完结";
        else
            bangumicard_isfinish.innerHTML = "连载中";
        bangumicard_isfinish.style.fontSize = "1vw";
        bangumicard[i].appendChild(bangumicard_isfinish);

        bangumicard_tags = document.createElement('div');
        bangumicard_tags.style.height = "20%";
        bangumicard_tags.style.width = "25%";
        bangumicard_tags.style.position = "absolute";
        bangumicard_tags.style.backgroundColor = "yellow";
        bangumicard_tags.style.left = "70%";
        bangumicard_tags.style.top = "75%";
        // bangumicard_tags.style.textAlign = "center";
        bangumicard_tags.innerHTML = "标签: " + bangumi_informations[i - 1]["tags"];
        bangumicard_tags.style.fontSize = "0.7vw";
        bangumicard[i].appendChild(bangumicard_tags);

        bangumicard_start = document.createElement('div');
        bangumicard_start.style.height = "20%";
        bangumicard_start.style.width = "20%";
        bangumicard_start.style.position = "absolute";
        bangumicard_start.style.backgroundColor = "yellow";
        bangumicard_start.style.left = "20%";
        bangumicard_start.style.top = "75%";
        bangumicard_start.style.textAlign = "center";
        bangumicard_start.innerHTML = "开播: " + bangumi_informations[i - 1]["start_time"];
        bangumicard_start.style.fontSize = "1vw";
        bangumicard[i].appendChild(bangumicard_start);

    }
}

function main()
{
    let xhr = new XMLHttpRequest();
    xhr.open("post", "/bangumiInfo", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('index', 'season');
    xhr.setRequestHeader('key', '2025.4');
    xhr.send();
    xhr.onreadystatechange = function () 
    {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            bangumi_informations = JSON.parse(xhr.response)["data"];
            console.log(bangumi_informations);
            Init();
        }
        else if (xhr.status == 404)
        {
            console.log("接受信息失败");
        }
    }
}

main();



