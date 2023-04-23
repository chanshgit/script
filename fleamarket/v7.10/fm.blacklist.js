const driverName = '闲鱼黑名单';
const driveKey = 'fm_blacklist';

var obj = JSON.parse($response.body);
var blacklist = obj.data.result;
if (blacklist) {
  let black = $prefs.setValueForKey(JSON.stringify(blacklist), driveKey);
  if (black) {
    let msg = `${driverName}`
    $notify(msg, '闲鱼黑名单更新成功', '详见日志')
    console.log(msg);
    console.log(JSON.stringify(blacklist));
  }
}
$done({})