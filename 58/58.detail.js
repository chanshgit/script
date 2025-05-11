let body = JSON.parse($response.body);
const url = new URL($request.url);
const params = Object.fromEntries(url.searchParams.entries());
const infoId = body.result.sidDict.infoid;
//删除风险提示弹窗
delete body.result.other.show_dialog;
//删除更多房源推荐
delete body.result.other.load_more;
//删除直播看房弹窗
delete body.result.other.tangramPopup;
//去广告
delAD(body.result);
//添加收藏按钮
addFavBtn(body.result.other.top_message.right_bars)

//定制举报
/**
let el = right_bars[right_bars.length-1].randomdoor_info.extendList;
let report = el[el.length-1]
const exIn = getReportextend(body.result)
report.action = report.action.replace("%22%7D",exIn+"%22%7D")
*/

body = JSON.stringify(body);
$done({
    body
});

function addFavBtn(right_bars) {
    if(right_bars.findIndex(cell=>cell.collect_info) === -1){
        right_bars.splice(1,0,{
        "collect_info": {
            "type": "collect",
            "urlList": {
                "collectUrl": `https://houserentapp.58.com/favorite/api_add_user_favorite?infoId=${infoId}&type=`,
                "unCollectUrl": `https://houserentapp.58.com/favorite/Api_del_user_favorite_app?infoId=${infoId}&type=`,
                "requireUrl": `https://houserentapp.58.com/favorite/Api_is_user_favorite?infoId=${infoId}&callapp=msgcode`
            }
        }
    })
    }
}
function getReportextend(data){
    let userinfo= data.info.find(cell=>cell.zf_broker_userinfo)
    userinfo = userinfo.zf_broker_userinfo;
    //console.log(`console.log(``)`)
    console.log(`zf_broker_userinfo:${userinfo.username}`)
    let info = {
        userId:params.userId?params.userId:0,
        username:userinfo.username,
        comp:userinfo.company_name
    }
    info = JSON.stringify(info);
    info = encodeURIComponent("&tt="+encodeURIComponent(info))
    return info
}

function delAD(list){
    list.info = list.info.filter(cell=>cell.async_load_area?0:1)
}
