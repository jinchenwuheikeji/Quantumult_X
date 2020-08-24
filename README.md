#电视家 脚本重写和执行脚本

#放入对应编辑目录下，开启圈X运行脚本即可打开电视家APP就可以获取ck ID

[task_local]

0 7,12,20 * * *  dianshijia.js

[rewrite_local]

http:\/\/api\.gaoqingdianshi\.com\/api\/v5\/sign\/signin url script-request-header dianshijia.js
http:\/\/api\.gaoqingdianshi\.com\/api\/v2\/cash\/withdrawal url script-request-header dianshijia.js

#远程脚本路径：

https://raw.githubusercontent.com/jinchenwuheikeji/Quantumult_X/master/dianshijia.js

#腾讯新闻

[task_local]

 0 9 * * * txnews.js, tag=腾讯新闻
 
[rewrite_local]

https:\/\/api\.inews\.qq\.com\/event\/v1\/user\/event\/report\? url script-request-body txnews.js
    
[MITM]

hostname = api.inews.qq.com

远程脚本地址：https://raw.githubusercontent.com/jinchenwuheikeji/Quantumult_X/master/txnews.js

#QQ音乐

[task_local]

1 0 * * * qqmusic.js, tag=QQ音乐, enabled=true

[rewrite_local]

https:\/\/u\.y\.qq\.com\/cgi\-bin\/musicu.fcg url script-request-body qqmusic.cookie.js

[mitm]

hostname = *.y.qq.com

感谢群管：Leiyiyan（羊毛大佬） 修改维护，脚本原作者：chavyleung
