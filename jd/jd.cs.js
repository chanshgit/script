//京东优惠券凑单商品只查看 自营 商品
//couponSearch方法 
let body = JSON.parse($response.body);
body.wareInfo = body.wareInfo.filter(item => item.configDatas.priceUnder.findIndex(dec => dec.trackId === "self")!==-1);
$done({body: JSON.stringify(body)});