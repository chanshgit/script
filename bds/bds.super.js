/*皮皮虾去广告和水印 by Liquor030
如果只需要去广告功能请在[URL Rewrite]中添加
 
# Remove Super's Ad (By Liquor030)
app_name=super&([\S]*)aid=\d+ app_name=super_pro&$1aid=1412 header
 
可大幅改善使用体验，强烈建议添加并禁用该脚本，在需要的时候开启脚本去水印！！
=====================================
Feed: /feed/stream
回复: /comment/cell_reply
评论: /cell/cell_comment
Detail: /cell/detail
用户插眼: /ward/list
用户收藏: /user/favorite
用户评论: /user/cell_coment
用户feed: /user/cell_userfeed
用户发帖: /user/publish_list
用户主题：/item/cell_comment



**************************/

var body = $response.body.replace(/id\":([0-9]{15,})/g, 'id":"$1str"');
body = JSON.parse(body);

if (body.data.data && body.data.data[0] && body.data.data[0].block_info) {
  body.data.data = body.data.data[0].block_info.cell_list;
}
if (body.data.data) {
  obj = body.data.data;
} else if (body.data.replies) {
  obj = body.data.replies;
} else if (body.data.cell_comments) {
  obj = body.data.cell_comments;
} else {
  obj = null;
}

if (obj instanceof Array) {
  if (obj != null) {
    for (var i in obj) {
      if (obj[i].ad_info != null) {
        obj.splice(i, 1);
      }
      if (obj[i] && obj[i].item != null) {
        if (obj[i].item.video != null) {
                    obj[i].item.video.video_download.url_list = obj[i].item.origin_video_download.url_list;
        }
        for (var j in obj[i].item.comments) {
          if (obj[i].item.comments[j].video != null) {
                        obj[i].item.comments[j].video_download.url_list = obj[i].item.comments[j].video.url_list;
          }
        }
      }
      if (obj[i] && obj[i].comment_info != null) {
        if (obj[i].comment_info.video != null) {
                    obj[i].comment_info.video_download.url_list = obj[i].comment_info.video.url_list;
        }
      }
    }
  }
} else {
  if (obj.item != null) {
    if (obj.item.video != null) {
            obj.item.video.video_download.url_list = obj.item.origin_video_download.url_list;
    }
    for (var j in obj.item.comments) {
      if (obj.item.comments[j].video != null) {
                obj.item.comments[j].video_download.url_list = obj.item.comments[j].video.url_list;
      }
    }
  }
  if (obj.comment_info != null) {
    if (obj.comment_info.video != null) {
            obj.comment_info.video_download.url_list = obj.comment_info.video.url_list;
    }
  }
}
body = JSON.stringify(body);
body = body.replace(/id\":\"([0-9]{15,})str\"/g, 'id":$1');
body = body.replace(/\"can_download\":false/g, '"can_download":true');
//body = body.replace(/tplv-ppx-logo/g, '0x0');
//处理图片新域名会验证sign的问题
//https://p6-ppx-sign.byteimg.com/tos-cn-i-0000/3e41f19d5c454d4094a8b1c008204f0c~tplv-f3gpralwbh-c5-v1:200:200:q80.jpeg?x-expires=1694308910&x-signature=MedZ0aEA%2FXgxRWVx0FpGshVm5ag%3D 
//使用以前的请求方式
//https://p6-ppx.byteimg.com/tos-cn-i-0000/3e41f19d5c454d4094a8b1c008204f0c~0x0.jpeg
//0x0.jpeg,表示原图(无水印)
body = body.replace(/(-sign)?(\.[^\"]+?)tplv-(f3gpralwbh|ppx)-logo([^\}]+?)?\"/g, '$20x0.jpeg"');
//处理视频封面不显示的问题(如eKpL3GAEmCPumCqbZ+7dPqrIA18=)
body = body.replace(/(?<=x-signature=).+?(?=\")/g,(x)=>encodeURIComponent(decodeURIComponent(x)));
$done({
  body
});