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
} 
else if (obj.api === "mtop.taobao.idle.home.whale.modulet") {
    obj.data.container.sections = [obj.data.container.sections[3]];
}
else if (obj.api === "mtop.taobao.idle.awesome.detail.unit") {
    const sellerId = encodeURIComponent(obj.data.sellerDO.sellerId);
    body = body.replace(/hcAppId/g, `sellerId=${sellerId}&hcAppId`);
    obj = JSON.parse(body);
}
else if(obj.api === "mtop.taobao.idle.local.flow.plat.section"){
    obj.data.data.components = [
        localPlatSection()
        ];
}

body = JSON.stringify(obj);
$done({ body });

function localPlatSection(){
    return {
  "render" : "DX",
  "loadMoreEvent" : {

  },
  "sectionBizCode" : "fish_home_activity_enter_card",
  "data" : {
    "ext" : {
      "enableExtReplace" : "1",
      "columnType" : "one",
      "marginBottom" : "0",
      "marginTop" : "1"
    },
    "exposureParam" : {

    },
    "item" : {
      "0" : {
        "clickParam" : {
          "eventId" : "2201",
          "args" : {
            "spm" : "a2170.14016119.activitymore.0",
            "task_id" : "44311",
            "page" : "Page_xyLocalTab"
          },
          "arg1" : "MidBanner"
        },
        "backgroundUrl" : "https:\/\/gw.alicdn.com\/imgextra\/i2\/O1CN014dcHPe1uJNiMiVSQ1_!!6000000006016-2-tps-1077-216.png",
        "targetUrl" : ""
      }
    },
    "template" : {
      "name" : "fish_city_banner",
      "url" : "https:\/\/dinamicx.alibabausercontent.com\/pub\/fish_city_banner\/1722328603671\/fish_city_banner.zip",
      "version" : "1722328603671"
    }
  },
  "ext" : {
    "enableExtReplace" : "1",
    "columnType" : "one",
    "marginBottom" : "0",
    "marginTop" : "1"
  },
  "startEvent" : {

  },
  "style" : {

  },
  "virtual" : "false",
  "key" : "fish_home_activity_enter_cardV1"
}
}
