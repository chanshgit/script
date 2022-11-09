var body = $response.body;
var obj = JSON.parse(body);
var cardList = obj.data.sections;
cardList = cardList?cardList:[];
var sections = [];
cardList.forEach((card,index)=>{
var sData = card.data;
if(Object.keys(sData).length > 13){
    var uSketch = sData.user.userSketch;
    //console.log(uSketch);
    //满足条件：芝麻信用极好或无芝麻信用的
    var reg = new RegExp(/(neh|5KP)/);
    if(!uSketch && !uSketch.topTags[0].tagUrl && reg.exec(uSketch.topTags[0].tagUrl))
{ 
        sections.push(card);
}
   } 
});
obj.data.sections = sections;
obj.data.feedsCount = sections.length;
body = JSON.stringify(obj);
$done({body});
