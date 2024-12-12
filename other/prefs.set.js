const url = $request.url;
let body = $request.body;
body = decodeURIComponent(body);
const pathname = new URL(url).pathname.replace(/\//g,"_");
//body = JSON.parse(body)
//console.log(body.rules)
console.log(`配置(${pathname})：\n${body}`);

$prefs.setValueForKey(body,pathname)
const myHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Date': new Date().toUTCString(),
};
const myBody = JSON.stringify({msg: "success"});
$done({ status: 'HTTP/1.1 200', headers:myHeaders, body: myBody });
