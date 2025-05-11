var body = $response.body;
var obj = JSON.parse(body);
obj.data.sections = obj.data.sections.filter((section) => {
    //section长度小于13为水文
    if (Object.keys(section.data).length < 13) return false;
    //屏蔽广告
    if (section.data.bizType === 'AD') return false;
    //屏蔽大家搜

    if (obj.api === "mtop.taobao.idlehome.home.nextfresh") {
        section.data.targetUrl = section.data.targetUrl.replace("home_mini_detail", "awesome_detail");

    }

    const fishTags = section.data.fishTags;
    //信用极好、信用优秀、百次好评
    const fishTagsFlag = fishTags && fishTags.r4 && fishTags.r4.tagList[0] && /(极好|优秀|好评)/.test(fishTags.r4.tagList[0].data.content);
    //console.log(`fishTags:${fishTagsFlag}`);
    return fishTagsFlag
});
//返回结果的个数
obj.data.feedsCount = obj.data.sections.length;

body = JSON.stringify(obj);
$done({
    body
});