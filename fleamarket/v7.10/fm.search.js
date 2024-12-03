var obj = JSON.parse($response.body);
const ban_list = $prefs.valueForKey('ban_list');
const tmp1 = obj.data.resultList && obj.data.resultList[0];
obj.data.resultList = obj.data.resultList.filter((result) => {
  var exContent = result.data.item.main.exContent;
  //屏蔽大家搜
  if(Object.keys(exContent).length < 20) return false;
  //屏蔽淘宝广告
  if(exContent.isAliMaMaAD === "true") return false;
  //屏蔽"严选"
  if(/严选/.test(exContent.userIdentityShow)) return false;
  //屏蔽黑名单
  if(ban_list && ban_list.indexOf(result.data.item.main.clickParam.args.seller_id) != -1) return false;
  
  return exContent.fishTags.r4 && /信用极好/.test(exContent.fishTags.r4.tagList[0].data.content);
});
if (obj.data.resultInfo.trackParams.page === "1") {
  let len = obj.data.resultList.length;
  while (len < 3 && len > 0) {
    obj.data.resultList.push(tmp1);
    len++;
  }
}
//屏蔽选项卡多余项
//obj.data.tabList=[obj.data.tabList[0]];

var body = JSON.stringify(obj);
$done({body});
