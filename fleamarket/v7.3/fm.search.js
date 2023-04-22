var obj = JSON.parse($response.body);
obj.data.resultList = obj.data.resultList.filter((result) => {
  var exContent = result.data.item.main.exContent;
  //屏蔽大家搜
  if(Object.keys(exContent).length < 20) return false;
  //屏蔽淘宝广告
  if(exContent.isAliMaMaAD == "true") return false;
  //信用极好标识
  return exContent.fishTags.r4 && /(0BT|5KP)/.test(exContent.fishTags.r4.tagList[0].data.url);
});
//屏蔽选项卡多余项
obj.data.tabList=[obj.data.tabList[0]];

var body = JSON.stringify(obj);
$done({body});
