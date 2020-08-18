#电视家 脚本重写和执行脚本
#放入对应编辑目录下，开启圈X运行脚本即可打开电视家APP就可以获取ck ID
[task_local]
0 7,12,20 * * *  dianshijia.js

[rewrite_local]
http:\/\/api\.gaoqingdianshi\.com\/api\/v5\/sign\/signin url script-request-header dianshijia.js
http:\/\/api\.gaoqingdianshi\.com\/api\/v2\/cash\/withdrawal url script-request-header dianshijia.js
