const url = $request.url;
let body = $request.body;
body = decodeURIComponent(body);
const pathname = new URL(url).pathname.replace(/\//g,"_");
//body = JSON.parse(body)
//console.log(body.rules)
console.log("配置："+ body);

$prefs.setValueForKey(body,pathname)
$done({});
