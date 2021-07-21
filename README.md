#腾讯视频

[task_local]

0 1 * * * txvideo.js, tag=腾讯视频, enabled=true

[rewrite_local]


https:\/\/vip\.video\.qq\.com\/fcgi-bin\/comm_cgi - script-request-header txvideo.cookie.js

[mitm]

hostname=vip.video.qq.com


#脚本库其他脚本均搬运其他大佬

感谢：野比大佬
    chavyleung大佬
     
 幸苦制作脚本！如有问题请联系我！
 
我的TG群：https://t.me/jinweikeji
