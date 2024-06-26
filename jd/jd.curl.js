let url = $request.url;
let body = $request.body;

if(url.indexOf("coupon/batchGet")!=-1)
  body = url;

body = decodeURIComponent(body);
//Get roleId and key from body
let result = /"(roleId|ruleId)":"(\d+)"/.exec(body);
const roleId = result && result[2];
result = /"(key|encryptedKey|couponKey)":"(\w+)"/.exec(body);
const key = result && result[2];

if(!roleId || !key){
    console.log(`roleId: ${roleId},key: ${key}`);
    $done();
}
//Combo Coupon Link
const couponUrl = `https://coupon.m.jd.com/coupons/show.action?key=${key}&roleId=${roleId}`;
//Check Coupon Information by HTTPRequest
const bodyStr = `{"type":0,"key":"${key}","roleId":"${roleId}","linkKey":"","to":""}`;
const infoUrl = "https://api.m.jd.com/client.action?appid=h5_awake_wxapp&functionId=mcoupon_showcoupon&client=wh5&body="+encodeURIComponent(bodyStr);
const opts = {
    url: infoUrl,
    method: 'GET',
};
!(async () => {
    let batchInfo={};
    await $task.fetch(opts).then(resp => {
        const json = JSON.parse(resp.body);
        batchInfo = json.data && json.data.batchInfo;
    }, reason => {
        throw reason;
    });

    if(batchInfo){
        let {limitStr,discount,quota,discountInfo} = batchInfo;
        if(discountInfo&&discountInfo.info){
            discount = discountInfo.info[0].discount;
            discountInfo = `满${quota}打${discount*10}折`;
        }else
            discountInfo = `满${quota}减${discount}`;
        console.log(`京东优惠券--${discountInfo}(${limitStr}) ${couponUrl}`);
        $notify("京东优惠券",`${discountInfo}(${limitStr})`,couponUrl,{"open-url":couponUrl});
    }
})().catch(e=>{
    console.log(e);
}).finally(() => {
    $done();
})

