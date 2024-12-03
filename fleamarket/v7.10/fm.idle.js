var body = $response.body;
var obj = JSON.parse(body);
obj.data.sections = obj.data.sections.filter((section) => {
    //section长度小于13为广告
    if (Object.keys(section.data).length<13) return false;

    //推荐商品直接到商品详情页
    if(obj.api === "mtop.taobao.idlehome.home.nextfresh")
        section.data.targetUrl = section.data.targetUrl.replace("home_mini_detail","awesome_detail");
    var fishTags =section.data.fishTags;
    //筛选信用极好
    return fishTags && fishTags.r4 && fishTags.r4.tagList[0] && /信用极好/.test(fishTags.r4.tagList[0].data.content);
});
//返回结果的个数
obj.data.feedsCount = obj.data.sections.length;

body = JSON.stringify(obj);
$done({body});
