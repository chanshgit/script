var body = $response.body;
var obj = JSON.parse(body);
obj.data.sections = obj.data.sections.filter((section) => {
    //section长度小于13为广告
    if (Object.keys(section.data).length<13) return false;
    var fishTags =section.data.fishTags;
    return fishTags && fishTags.r4 && fishTags.r4.tagList[0].data.content=="芝麻信用极好";
});
//返回结果的个数
obj.data.feedsCount = obj.data.sections.length;

body = JSON.stringify(obj);
$done({body});
