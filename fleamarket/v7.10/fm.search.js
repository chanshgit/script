var obj = JSON.parse($response.body);
//var blacklist = $prefs.valueForKey("fm_blacklist");

obj.data.resultList = obj.data.resultList.filter((result) => {
  var exContent = result.data.item.main.exContent;
  //屏蔽大家搜
  if(Object.keys(exContent).length < 20) return false;
  //屏蔽淘宝广告
  if(exContent.isAliMaMaAD == "true") return false;

  //黑名单功能
  /**
  if(exContent.detailParams && blacklist){
    var userNick = exContent.detailParams.userNick;
    var blobj =JSON.parse(blacklist);
    blobj.every(item => {
      if(item.userNick==userNick) {
        console.log(`${userNick}已经被拉入黑名单!`);
        return false;
        }
    });
  }
  */
  return exContent.fishTags.r4 && exContent.fishTags.r4.tagList[0].data.content=="芝麻信用极好";
});
//屏蔽选项卡多余项
obj.data.tabList=[obj.data.tabList[0]];

var body = JSON.stringify(obj);
$done({body});
