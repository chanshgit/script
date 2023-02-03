var body = JSON.parse($response.body); 
/**
0 = "bpMainImage:true";
    1 = "bpCommonBanner:true";
    2 = "bpCjxpUp:true";
    3 = "bpName:true";
    4 = "bpAggrePromo:true";
    5 = "bpAddr:true";
    6 = "bpServe:true";
    7 = "bpEvaluate:true";
    8 = "bpShop:false";
    9 = "bpMasterdata:true";

*/
var noList = ["bpPGC","bpShop","bpRelRecom","bpMidRelRecom","bpServe"];
var vlog=[];
body.floors = body.floors.filter((flr)=>{
 
var flag = noList.indexOf(flr.mId) == -1;
vlog.push(`${flr.mId}:${flag}`);
return flag;
});
console.log(vlog); 
body = JSON.stringify(body);
$done({body}); 
