var body = $response.body;
var obj = JSON.parse(body);
const api = obj.api;
if(api=="mtop.taobao.idle.local.flow.plat.section"){
    obj.data.data.components = [obj.data.data.components[1]];
} 
else if(api=="mtop.taobao.wireless.home.xianyu.awesome.get"){
    obj.data.container.sections=obj.data.container.sections.splice(3,1);
}
body = JSON.stringify(obj);
$done({body});