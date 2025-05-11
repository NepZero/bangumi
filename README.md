# 仓库介绍
一个基于Html和Nodejs前后端结合一个大数据库作业，使用Mysql作为数据库。是关于每月番剧信息的一个检索网站，以及可以查看以往几年的番剧信息。

# 仓库初始化
1. 下载安装Nodejs，详细看此[B站视频](https://www.bilibili.com/video/BV19F411t7zX/?share_source=copy_web&vd_source=3e9e72ed2a403a7c4db67b5165334887).
 + 安装Nodejs安装包
 + 在安装好的根目录下建立两个文件夹node_cache和node_global
 + 将此根目录和上面两个文件夹添加到环境变量中
 + 命令行输入node -v和npm -v，有显示则成功
2. 安装本项目所需的依赖库，在项目根目录命令行依次输入`npm i` , `npm i -g nodemon`(可能因为权限问题报错，以管理员身份运行cmd)
3. 安装Mysql数据库和数据库可视化软件mysqlworkbench，参考此[文章](https://blog.csdn.net/weixin_39289696/article/details/128850498),端口号默认3306,密码设置为123456(不然要去后端自行修改数据库配置).在服务中有Mysql的服务则成功。
4. 导入数据库文件（database文件夹下）详细参考此[文章](https://blog.csdn.net/qq_40930559/article/details/104024283).

# 仓库使用
在跟目录运行`npm run server`,输入网址127.0.0.1:8080预览网页
（运行不了则在cmd上运行`node app.js`）