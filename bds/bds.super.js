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
//收藏页
const isFavorite = $request.url.indexOf('favorite') > -1;
//版本1.4.6
const v_146=$request.url.indexOf('1.4.6') > -1;
const rate = 0.6;
const ntime = new Date().getTime() / 1000;
var body = $response.body.replace(/id\":([0-9]{15,})/g, 'id":"$1str"');
body = JSON.parse(body);

if (body.data.data && body.data.data[0] && body.data.data[0].block_info) {
  body.data.data = body.data.data[0].block_info.cell_list;
}

let obj = body.data.data || body.data.replies || body.data.cell_comments;

if (obj instanceof Array) {
  if (obj != null) {
    for (var i=0;i<obj.length;i++) {
      
      if (obj[i].ad_info != null) {
        obj.splice(i--, 1);
        continue;
      }
      if (obj[i] && obj[i].item != null) {
        //收藏页分享链接重置
        if(isFavorite){
          obj[i].item.share.share_url = obj[i].item.share.schema;
        }
        if(isStream) {
          //推荐列表,"用户名"后显示"浏览量"和"发布时间"
        var time = ntime - obj[i].item.create_time;        
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
        if(viewCount < 100000 && viewCount/1000/(time / (60 * 60))<rate && time > 2*60*60){
          obj.splice(i--,1);
          continue;
        }
        }
        if (obj[i].item.video != null) {
                    obj[i].item.video.video_download.url_list = obj[i].item.origin_video_download.url_list;
                    obj[i].item.video.video_hight.url_list = obj[i].item.origin_video_download.url_list;
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
//20230514更新,url_list替换download_list
body = body.replace(/"url_list":(\[\{[^\]]*\}\]),"is_gif":false,"download_list":\[\{[^\]]*\}\]/g,(x,y)=>`"url_list":${y},"is_gif":false,"download_list":${y}`);
//处理视频封面不显示的问题(如eKpL3GAEmCPumCqbZ+7dPqrIA18=)
if(v_146)
  body = body.replace(/x-signature=(.+?)(?=(\\)?\")/g,(x,y)=>'x-signature='+encodeURIComponent(y));
$done({
  body
});
