let url = $request.url;
console.log(`原URL：${url}`);

url = decodeURIComponent(url);
console.log(`解码后的URL：${url}`);
$done();
