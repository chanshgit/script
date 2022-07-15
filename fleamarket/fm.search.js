var obj = JSON.parse($response.body);
var resultList = obj.data.resultList;
var tempList = [];
//芝麻信用极好图片验证规则
var reg = new RegExp(/(neh|5KP)/g);

for(let cell of resultList){
  var exContent = cell.data.item.main.exContent;
  //屏蔽大家搜
  if(Object.keys(exContent).length < 20) 
    continue; 
  //淘宝广告
  if(exContent.isAliMaMaAD == "true")
    continue;


  //芝麻信用
  //var isGoodMan = exContent.stuffStatusTagUrl?reg.exec(exContent.stuffStatusTagUrl):true; 
  //since 8.0
  var isGoodMan = exContent.fishTags.r4?reg.exec(exContent.fishTags.r4.tagList[0].data.url):true;
  if(!isGoodMan) continue;

  //特殊标签，如闲鱼优品等
  var speUrl = exContent.richTitle[0].data.url
  if(speUrl && speUrl.indexOf("147") != -1)
    continue;


  tempList.push(cell);
  
}

obj.data.resultList = tempList;
//屏蔽选项卡多余项
tempList=[];
tempList.push(obj.data.tabList[0]);
obj.data.tabList = tempList;

var body = JSON.stringify(obj);
$done({body});
