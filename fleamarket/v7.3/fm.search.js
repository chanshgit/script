var obj = JSON.parse($response.body);
const ban_list = $prefs.valueForKey('ban_list');
obj.data.resultList = obj.data.resultList.filter((result) => {
  var exContent = result.data.item.main.exContent;
  //屏蔽大家搜
  if(Object.keys(exContent).length < 20) return false;
  //屏蔽淘宝广告
  if(exContent.isAliMaMaAD === "true") return false;
  //屏蔽黑名单
  if(ban_list && ban_list.indexOf(result.data.item.main.clickParam.args.seller_id) != -1) return false;
  //信用极好标识
  return exContent.fishTags.r4 && /(0BT|5KP)/.test(exContent.fishTags.r4.tagList[0].data.url);
});
//屏蔽选项卡多余项
obj.data.tabList=[obj.data.tabList[0]];

var body = JSON.stringify(obj);
$done({body});
