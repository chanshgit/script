var body = JSON.parse($response.body);
const path = $request.path;
//console.log(`jd.other.js>>>url:${path}`);
if(path.indexOf("personinfoBusiness") >-1){
    //7>我的专属助手,8>我的推荐,9>我的常买常逛,10>我的专属助手--详情
    body.floors.splice(7,4);
    //console.log(`body.floors[].length: ${body.floors.length}`);
}
else if (path.indexOf("getLegoWareDetailComment") > -1 ){

    body.buyersCommentInfo={};
}
body = JSON.stringify(body);
$done({body});