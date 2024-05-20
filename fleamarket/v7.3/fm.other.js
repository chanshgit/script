var body = $response.body;
var obj = JSON.parse(body);
const api = obj.api;
if(api=="mtop.taobao.idle.local.flow.plat.section"){
    obj.data.data.components = [obj.data.data.components[1]];
} 
else if(api=="mtop.taobao.wireless.home.xianyu.awesome.get"){
    obj.data.container.sections=obj.data.container.sections.splice(3,1);
}
else if(api=="mtop.taobao.idle.awesome.detail.unit"){
    const sellerId = encodeURIComponent(obj.data.sellerDO.sellerId);
    body = body.replace(/hcAppId/g, `sellerId=${sellerId}&hcAppId`);
    obj = JSON.parse(body);
}
body = JSON.stringify(obj);
$done({body});