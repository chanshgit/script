var body = JSON.parse($response.body); 
/**
bpPGC > 好物测评
bpMatchPurchase>搭配购
bpBusSupport > 广告条
bpShop > 店铺信息
bpMidRecommond >
bpRecommend > 商品推荐
*/
var noList = ["bpPGC","bpMatchPurchase","bpBusSupport","bpShop","bpRecommend","bpMidRecommond","bpRelRecom","bpMidRelRecom"];
body.floors = body.floors.filter((flr)=>{
    if(flr.mId=="bpMasterdata"){//屏蔽店铺介绍
        flr.data.shopInfo={};
    }
    console.log(`floors.mid:${flr.mId}:${noList.indexOf(flr.mId) == -1}`);
    return noList.indexOf(flr.mId) == -1;
});
body = JSON.stringify(body);
$done({body}); 
