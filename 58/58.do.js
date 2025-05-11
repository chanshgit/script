//banUsers.data 数据格式
const banUsersData = {
    "12345": {
        "name": "张三",
        "text": "XX房地产经纪有限公司"
    }
}
//规则文件数据格式
const setting = {
    usedTages: {
        tag: "usedTages",
        data: "押一付一"
    },
    title: {
        tag: "title",
        data: "押一付一"
    },
    banUsers: {
        tag: "exposure_action.action_info.wuba_params.broker_id",
        data: banUsersData
    },
    infofavList: ["123"],
    infoBlackList: ["123"]
}
let kvStr = $prefs.valueForKey("58_zufang_rules");
let cache58 = kvStr?JSON.parse(kvStr): setting;
//初始化规则
kvStr?1: $prefs.setValueForKey(JSON.stringify(cache58), "58_zufang_rules")

let body = JSON.parse($response.body);
//console.log(body.msg)
const urlStr = $request.url;
try {
    let listInfo = body.result.getListInfo || body.result.getHouseOnMapListInfo
    listInfo.infolist = handler(listInfo.infolist)
}catch(e) {
    console.log(`Error:${e.message}`)
}
body = JSON.stringify(body);
$done({
    body
});


function handler(infolist) {
    return infolist.filter(info=> {
        //console.log("0000000000000000"+info.usedTages)
        //去广告
        /**
        const len = Object.keys(info).length;
        if(len === 18 || len > 64){
        return false;
        }
        */
        /**
        //黑名单
        if(cache58.infoBlackList.includes(info.infoID)){
        console.log(`过滤黑名单：${info.title}`)
        return false;
        }
        */
        //收藏列表
        //console.log(`收藏列表：${typeof info.infoID}===${typeof cache58.infoFavList[0]} @@@@@${cache58.infoFavList.includes(info.infoID)}`)

        if (cache58.infoFavList.includes(info.infoID+"")) {
            info.usedTages = "已收藏,"+info.usedTages;
            console.log(`显示收藏标签：${info.title}`)
            return true;
        }
        if (new RegExp(cache58.usedTages.data).test(info.usedTages)) {
            return false;
        }
        if (new RegExp(cache58.title.data).test(info.title)) {
            return false;
        }
        const sonId = getValueByJSONPath(info, cache58.banUsers.tag);
        console.log("\r\n"+info.title + ">>> "+sonId +"<<<<"+info.infoID);
        //sonId传入detail页面
        //info.exposure_action.action_info.wuba_params.sonId=sonId;
        //过滤掉垃圾中介
        if (Object.keys(cache58.banUsers.data).includes(sonId)) {
            const son = cache58.banUsers.data[sonId]
            console.log(`\r\n过滤：${info.title} - ${son.text} - ${son.name}`)
            return false
        }
        return true;
    })
}

function getValueByJSONPath(json, path, defaultValue = undefined) {
    if (!json || typeof json !== 'object') {
        return defaultValue;
    }

    // 将路径按 "." 和 "[]" 分割成数组
    const keys = path.split(/\.|\[|\]/).filter((key) => key !== '');

    let current = json;
    for (const key of keys) {
        if (current === null || typeof current !== 'object') {
            return defaultValue;
        }

        // 处理数组索引
        if (Array.isArray(current) && /^\d+$/.test(key)) {
            const index = parseInt(key, 10);
            if (index >= current.length) {
                return defaultValue;
            }
            current = current[index];
        } else if (current.hasOwnProperty(key)) {
            current = current[key];
        } else {
            return defaultValue;
        }
    }

    return current !== undefined ? current: defaultValue;
}