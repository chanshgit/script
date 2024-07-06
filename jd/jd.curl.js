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
        let retInfo = `${discountInfo}(${limitStr}) ${couponUrl}`;
        console.log("京东优惠券--"+retInfo);
        retInfo = formatTime(new Date(),"yyyy/MM/dd hh:mm:ss")+":  "+retInfo;
        retInfo = encodeURIComponent(retInfo);
        const openUrl="shortcuts://run-shortcut?name=jd-coupon&input="+retInfo;
        $notify("京东优惠券",`${discountInfo}(${limitStr})`,couponUrl,{"open-url":openUrl});
    }
})().catch(e=>{
    console.log(e);
}).finally(() => {
    $done();
})


function formatTime(date, format) {
  const map = {
    'yyyy': date.getFullYear(),
    'MM': String(date.getMonth() + 1).padStart(2, '0'),
    'dd': String(date.getDate()).padStart(2, '0'),
    'hh': String(date.getHours()).padStart(2, '0'),
    'mm': String(date.getMinutes()).padStart(2, '0'),
    'ss': String(date.getSeconds()).padStart(2, '0')
  };
  
  return format.replace(/yyyy|MM|dd|hh|mm|ss/g, match => map[match]);
}
