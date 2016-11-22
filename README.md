# a website built by react-express-webpack-mongo
* 在mac终端操作的命令如下：
<pre><code>npm install</code></pre>
<pre><code>webpack</code></pre> 
* 因为webpack设置了watch：true，所有可以手动结束webpack，也可以新开一个终端窗口输入启动命令
* 因为项目设置了github关联登录，所以启动命令要这样写：
<p>mac</p><pre><code>GITHUB_CLIENT_ID=“你申请的id” GITHUB_CLIENT_SECRET=“你申请的secret” nodemon</code></pre>
<p>windows</p><pre><code>SET GITHUB_CLIENT_ID=xxxx &  GITHUB_CLIENT_SECRET=xxxx & nodemon</code></pre>
* 此时打开localhost:3000便可以看到网站页面
* 需要添加数据的话，要先确保本地mongodb已经打开

