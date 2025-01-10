let url = $request.url;
let headers = $request.headers;

if (url.indexOf("p3-ppx-sign") != -1) {
    url = url.replace(/x-signature=(.*?)$/g, (m, p) => 'x-signature='+encodeURIComponent(p));
    $done({url, headers});
}
$done();
