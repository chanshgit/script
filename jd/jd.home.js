var body = JSON.parse($response.body);
//ToDo....
//推荐商品列表
body.recommend = [];
//启动广告
body.webViewFloorList = [];
/*
3112>京东数码
7046>左上角图片广告
7271>领京豆
7531>日历
8407>11.0UI商品推荐栏
9421>京东超市分类栏
9493>顶部分类tab
9831>秒杀之类等
9924>搜索框
10067>趋势
10086>资质入口
10156>京东老用户
10195>首页|同城
10338>搜索base
10352>推荐分类栏内容
10433>高京享值
10605>百亿补贴
10606>搜索框
*/
var myfloors = [7046, 7271, 9421, 10195, 10352, 10606];
body.floorList = body.floorList.filter((floor) => {
  //console.log(`floor.showName:${floor.showName}`);
  return myfloors.indexOf(floor.floorId) > -1;
});
body = JSON.stringify(body);
$done({ body });

