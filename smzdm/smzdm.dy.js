//值率
const MY_WORTHY = 60;

var body = JSON.parse($response.body);
var rows = body.data.rows;
var newrows = [];
var reg = new RegExp(/(绝对值|降价)/g);
for (var row of rows) {
  var val = 0;
  //聚合列表(如三小时最热\白菜党等)
  if(row.article_list){
    for(let i=0;i<row.article_list.length;i++){
      const ar = row.article_list[i];
      const total = parseInt(ar.article_worthy) + parseInt(ar.article_unworthy);
      val = total==0?0:parseInt(ar.article_worthy) / total;
      //console.log(ar.article_title+", "+val)
      if(val * 100 < MY_WORTHY){
        row.article_list.splice(i--,1);
      }
    }
    if(row.article_list.length == 0){
      val=0
    }
  }else if (row.article_interaction) {
    var itst = row.article_interaction;
    // console.log(itst);
    const total = parseInt(itst.article_worthy) + parseInt(itst.article_unworthy);
      val = total==0?0:parseInt(itst.article_worthy) / total;
  } else if(row.article_worthy) {
    //9.3.3版本等旧版
    const total = parseInt(row.article_worthy) + parseInt(row.article_unworthy);
    val = total==0?0:parseInt(row.article_worthy) / total;
  }
  
  if (reg.exec(row.dingyue_source) || val * 100 > MY_WORTHY) {
    newrows.push(row);
  }
}
body.data.rows = newrows;
body = JSON.stringify(body);
$done({ body });
