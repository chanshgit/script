let url = $request.url;

if(url.indexOf("receiveNcoupon")!=-1){
    url = $request.body;
}

let json = urlParamsTOJson(url);

let body = json.body||"";
body = decodeURIComponent(body);
body = JSON.parse(body);

const ruleId = body.couponInfos&&body.couponInfos[0].ruleId;
const encryptedKey = body.couponInfos&&body.couponInfos[0].encryptedKey;

const roleId = ruleId||body.ruleId||"00000";
const key = encryptedKey||body.couponKey||"00000";

let couponUrl = `https://coupon.m.jd.com/coupons/show.action?key=${key}&roleId=${roleId}`;

$notify("京东优惠券",couponUrl);
console.log(couponUrl);

$done();
function urlParamsTOJson(url) {
   let params = new URLSearchParams(url);
   let json = {};
   for(const [key,value] of params){
      json[key] = value;
   }
    return json;
}
