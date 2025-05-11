let body = JSON.parse(($response || $request).body || "{}");
const kvStr = $prefs.valueForKey("58_zufang_rules");
let cache58 = JSON.parse(kvStr);
const urlStr = $request.url;
console.log(`$request.url=${urlStr}`)
const infoId = urlStr.indexOf("infoId=")>-1?urlStr.match(/infoId=(\d+)/)[1]: 0;
//console.log(`debug：${urlStr.search(/api_add_user_favorite/i)}`)
//缓存收藏列表
if (urlStr.search(/api_get_user_favorite/i) > -1) {
    try {
        prefsFavList(body.data.wishList);
    }catch(e) {
        console.log(`错误：${e}`)
    }
    done(true);
}
//单个房源收藏
if (urlStr.search(/api_add_user_favorite/i) > -1) {
    const i = cache58.infoFavList.indexOf(infoId);
    if (i === -1) {
        cache58.infoFavList.push(infoId);
        console.log(`单个房源收藏：${infoId}`)
        done(true);
    }
}
//单个房源取消收藏
if (urlStr.search(/api_del_user_favorite/i) > -1) {
    const i = cache58.infoFavList.indexOf(infoId);
    if (i > -1) {
        cache58.infoFavList.splice(i, 1);
        console.log(`单个房源取消收藏：${infoId}`)
        done(true);
    }
}
//定制举报事件为拉黑房源
if (urlStr.indexOf("/report/") > -1) {
    cache58.infoBlackList.push(infoId);
    done(true)
}
//ban发布人
if (urlStr.indexOf("broker") > -1) {
    banUserv13(body.data.broker.base);
    done();
}
//const resp = $response.body;
done();

//缓存收藏列表
function prefsFavList(data) {
    let array = [];
    console.log(data)
    data.forEach((x) => {
        x.forEach(y=> {
            !y.isInvalid && array.push(y.infoID);
        })
    })

    cache58.infoFavList = array;
    console.log(`favlist: ${JSON.stringify(array)}`)
}

function banUser(url, body) {
    const id = url.match(/brokerId=(\d+)/)[1];
    const name = body.result.zfBrokerInfo.card.userName;
    //const ipLocal = body.result.zfBrokerInfo.card.ipLocal;
    const text = body.result.zfBrokerInfo.userServiceInfo[0].text;
    let params = {
        "prefs_key": "58_zufang_rules",
        "action": [{
            "type": "add",
            "title": `将“${name}”拉黑`,
            "params": {
                "node": "banUsers.data",
                "data": {
                    [id]: {
                        name: name,
                        text: text
                    }
                }
            }
        },
            {
                "type": "del",
                "title": `将“${name}”解黑`,
                "params": {
                    "node": "banUsers.data",
                    "data": id
                }
            }],

    }
    params = encodeURIComponent(JSON.stringify(params));
    const openUrl = "shortcuts://run-shortcut?name=qx-action&input=" + params
    $notify("58同城租房", "黑名单", `${text}-${name}`, {
        "open-url": openUrl
    });
}
function banUserv13(baseInfo) {
    let params = {
        "prefs_key": "58_zufang_rules",
        "action": [{
            type:"view",
            title:"查看黑名单",
            params:{
                node:"."
            }
        }]
    }
    if (cache58.banUsers.data.hasOwnProperty(baseInfo.brokerId)) {
        params.action.splice(0,0,{
            type: "del",
            title: `将“${baseInfo.name}”解黑`,
            params: {
                node: "banUsers.data",
                data: baseInfo.brokerId
            }
        })
    } else {
        params.action.splice(0,0,{
            type: "add",
            title: `将“${baseInfo.name}”拉黑`,
            params: {
                node: "banUsers.data",
                data: {
                    [baseInfo.brokerId]: {
                        name: baseInfo.name,
                        text: baseInfo.companyFullName
                    }
                }
            }})
    }
    //console.log(`params:${JSON.stringify(params)}`)
    params = encodeURIComponent(JSON.stringify(params));
    const openUrl = "shortcuts://run-shortcut?name=qx-action&input=" + params
    $notify("58同城租房", "黑名单操作", `${baseInfo.companyFullName}-${baseInfo.name}`, {
        "open-url": openUrl
    });
}
function done(isPrefs = false, isBody = false) {
    if (isPrefs)
        $prefs.setValueForKey(JSON.stringify(cache58), "58_zufang_rules");
    if (isBody) {
        body = JSON.stringify(body);
        $done({
            body
        })
    } else
        $done();
}