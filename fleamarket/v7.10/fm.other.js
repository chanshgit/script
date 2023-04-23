//$request.url, $request.path
var obj = JSON.parse($response.body);
if(obj.api.indexOf("home.tabentry") > -1){
    obj.data.tabConfig = obj.data.tabConfig.filter((tab)=>{
        return tab.tabConfigId != "showGoodItem";
    });

}else if(obj.api.indexOf("whale.modulet") > -1)//whale.modulet
    {
        obj.data.container.sections=[obj.data.container.sections[3]];
    }

var body = JSON.stringify(obj);
$done({body});