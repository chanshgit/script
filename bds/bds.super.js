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
//主页内容
const isStream = $request.url.indexOf('stream') > -1;
//版本1.4.6
const v_146=$request.url.indexOf('1.4.6') > -1;
const rate = 0.6;
console.log(isStream);
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
    for (var i=0;i<obj.length;i++) {
      
      if (obj[i].ad_info != null) {
        obj.splice(i--, 1);
        continue;
      }
      if (obj[i] && obj[i].item != null) {
        if(isStream) {
          //推荐列表,"用户名"后显示"浏览量"和"发布时间"
        var time = new Date().getTime() / 1000 - obj[i].item.create_time;        
        var tstr = "";
        if (time / 60 < 60) tstr = Math.floor(time / 60) + "分钟前";
        else if (time / (60 * 60) < 24)
          tstr = Math.floor(time / (60 * 60)) + "小时前";
        else if (time / (60 * 60 * 24) < 30)
          tstr = Math.floor(time / (60 * 60 * 24)) + "天前";

        //浏览量
        var viewCount = obj[i].item.stats.play_count?obj[i].item.stats.play_count:obj[i].item.stats.view_count;
        obj[i].item.author.name = obj[i].item.author.name + ` ·${tstr}·${viewCount}`;
        //console.log(`时间:${tstr},viewCount:${viewCount}`);
        //按时间过虑内容
        if(viewCount < 100000 && viewCount/1000/(time / (60 * 60))<rate && time > 3*60*60){
          obj.splice(i--,1);
          continue;
        }
        }
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
//0x0.jpeg,表示原图(无水印)失效！
//body = body.replace(/(-sign)?(\.[^\"]+?)tplv-(f3gpralwbh|ppx)-logo([^\}]+?)?\"/g, '$20x0.jpeg"');
//20230514更新,url_list替换download_list
body = body.replace(/"url_list":(\[\{[^\]]*\}\]),"is_gif":false,"download_list":\[\{[^\]]*\}\]/g,(x,y)=>`"url_list":${y},"is_gif":false,"download_list":${y}`);
//body = body.replace(/"url_list":(\[\{[^\]]*\}\]),"is_gif":false,"download_list":\[\{[^\]]*\}\]/g,(x,y)=>{console.log(`x:${x},y:${y}`);return x;});
//处理视频封面不显示的问题(如eKpL3GAEmCPumCqbZ+7dPqrIA18=)
if(v_146)
  body = body.replace(/x-signature=(.+?)(?=(\\)?\")/g,(x,y)=>'x-signature='+encodeURIComponent(y));
$done({
  body
});
