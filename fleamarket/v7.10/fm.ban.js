let body = $request.body;
let url = $request.url;
let ban_list = $prefs.valueForKey("ban_list");
ban_list = ban_list ? ban_list.split(",") : [];
const matches = /sellerId=(.*?)&/.exec(url);
let sellerId = matches && matches[1] ;
sellerId = sellerId && decodeURIComponent(sellerId);
// remove the sellerId from the ban list
if (ban_list.indexOf(sellerId) !== -1){
    ban_list = ban_list.filter(id => id !== sellerId);
    console.log("删除ban_list: " + sellerId);
}else{
    ban_list.push(sellerId);
    console.log("添加ban_list: " + sellerId);
}
$prefs.setValueForKey(ban_list.join(","), "ban_list");
$done();
