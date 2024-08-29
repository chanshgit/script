//$request.url, $request.path
var body = $response.body
var obj = JSON.parse(body);

if (obj.api === "mtop.taobao.idlehome.home.tabentry") {
    obj.data.tabConfig = obj.data.tabConfig.filter((tab) => {
        //过滤掉鱼币抵钱和省钱小组
        //tabId:138498_1 tiltle:鱼币抵钱
        //tabId:saveMoney title:省钱小组
        return !/(138498_1|saveMoney)/.test(tab.tabId);
    });
} else if (obj.api === "mtop.taobao.idle.home.whale.modulet") {
    obj.data.container.sections = [obj.data.container.sections[3]];
} else if (obj.api === "mtop.taobao.idle.awesome.detail.unit") {
    const sellerId = encodeURIComponent(obj.data.sellerDO.sellerId);
    body = body.replace(/hcAppId/g, `sellerId=${sellerId}&hcAppId`);
    obj = JSON.parse(body);
}

body = JSON.stringify(obj);
$done({ body });
