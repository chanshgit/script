var body = $response.body;
var obj = JSON.parse(body);
obj.data.sections = obj.data.sections.filter((section) => {
    //section长度小于13为广告
    if (Object.keys(section.data).length<13) return false;
    //屏蔽大家搜

    if(obj.api == "mtop.taobao.idle.local.home"){
        const user = section.data.user;
        const userFlag = user && user.userSketch && /(0n6|neh|0BT|5KP)/.test(user.userSketch.topTags[0].tagUrl);
        //console.log(`userTags:${userFlag}`);
        return userFlag;
    }

    const fishTags =section.data.fishTags;
    const fishTagsFlag = fishTags && fishTags.r4 && /(0n6|neh|0BT|5KP)/.test(fishTags.r4.tagList[0].data.url);
    //console.log(`fishTags:${fishTagsFlag}`);
    return fishTagsFlag
});
//返回结果的个数
obj.data.feedsCount = obj.data.sections.length;

body = JSON.stringify(obj);
$done({body});
