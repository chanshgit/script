/**
 * ^https://api.smzdm.com/v1/user/dingyue/articles url script-response-body https://raw.githubusercontent.com/chanshgit/script/main/smzdm/smzdm.dy.js
 */

var body = JSON.parse($response.body);
//ToDo....
var rows = body.data.rows;
var newrows = [];
var reg = new RegExp(/(绝对值|降价)/g);
for (var row of rows) {
  var val = 0;
  if (row.article_interaction) {
    var itst = row.article_interaction;
    // console.log(itst);
    val =
      parseInt(itst.article_worthy) /
      (parseInt(itst.article_worthy) + parseInt(itst.article_unworthy));
  } else {
    //9.3.3版本等旧版
    val =
      parseInt(row.article_worthy) /
      (parseInt(row.article_worthy) + parseInt(row.article_unworthy));
  }
  //console.log(val);
  if (reg.exec(row.dingyue_source) || val * 100 > 60) {
    newrows.push(row);
  }
}
body.data.rows = newrows;

body = JSON.stringify(body);

$done({ body });
