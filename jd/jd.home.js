var body = JSON.parse($response.body);
//ToDo....
body.tips = {};
body.recommend = [];
body.webViewFloorList = [];
/**
 * 7531 > 日历 
 * 10067 > 趋势
 * 9421 > 京东超市等
 * 9493 > 顶部分类tab *
 * 9831 > 秒杀之类等
 * 10086 > 资质入口
 * 10082 > 推荐 *
 * 9924 > 搜索框
 * 8407 > 推荐列表*
*/
var noFlrs = [9421,10082, 8407];
body.floorList = body.floorList.filter((flr) => {
  var flag = noFlrs.indexOf(flr.floorId) != -1;
  return flag;
});
body = JSON.stringify(body);
$done({ body });

