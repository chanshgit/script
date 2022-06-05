/**
 * ^https://homepage-api.smzdm.com/(v1/)?home\? url script-response-body https://raw.githubusercontent.com/chanshgit/script/main/smzdm/smzdm.home.js
 */

var body = JSON.parse($response.body);  //ToDo....
var rows = body.data.rows;
var newrows= [];
for(var row of rows){
  var val = 0;
  if(row.article_interestion){
    var itst = article_interestion;
    val = parseInt(itst.article_worthy)/(parseInt(itst.article_worthy)+parseInt(itst.article_unworthy))
  }else{
    //9.3.3版本等旧版
    val = parseInt(row.article_worthy)/(parseInt(row.article_worthy)+parseInt(row.article_unworthy));
  }
  //console.log(val); 
  if(val*100 > 30){
    newrows.push(row);
  }
}
body.data.rows= newrows;
 body = JSON.stringify(body);
 $done({body}); 
