//值率
const MY_WORTHY = 60;
//我喜欢的栏目
const reg = /(绝对值|降价)/;
//关注规则
let rules = [{
    name:"婴儿尿裤",//dingyue_source
    kw_id:1831, //关键分类id,暂时不用
    regex:"(光羽|天使|大鱼海棠|狮子王国|小森林).*(NB|S|M)", //article_title
    prices:[0,100], //[0,1000]价格区间,为null或者0则不处理
    worthy_rate:0, //值率，0表不设置
}]
//全局变量 配合捷径(快捷指令)，即时更新订阅规则
const rule_str = $prefs.valueForKey("_smzdm_dingyue_rules")
rules = rule_str?JSON.parse(rule_str).rules : rules;

//console.log("===========================")
let body = JSON.parse($response.body);
let rows = body.data.rows;
body.data.rows = rows.filter(row =>{
    let code = 0;
    let list = row.article_list;
    if(list){
        //console.log(row.article_title+"⬇️⬇️");
        row.article_list = list.filter(cell =>{
            cell.dingyue_source = row.dingyue_source;
            code = matchRules(cell);
            //console.log(cell.article_title+"====="+code);
            return code > 0 ;
        })
        //长度为0会被过滤掉
        return row.article_list.length
    }
    code = matchRules(row);
    //console.log(row.article_title+">>>>>>>"+code);
    return reg.test(row.dingyue_source) || code >0;
});

body = JSON.stringify(body);
$done({ body });

//关键词处理逻辑
function matchRules(data) {
    //const rule = rules.filter(r=>data.matches_rules.some(mr.keyword_id === r.kw_id))[0]
    let ret = 0;
    const rule = rules.filter((r) => new RegExp(r.name).test(data.dingyue_source))[0];
    //console.log(rule);
    //for v9.3.3
    const worthy_rate = calWorthy(data.article_interaction ? data.article_interaction : data);

    if (rule) {
        ret = new RegExp(rule.regex).test(data.article_title) ? 1 : -1;
        if (ret > 0 && rule.worthy_rate) {
            ret = worthy_rate >= rule.worthy_rate ? 2 : -2;
        }
        if (ret > 0 && rule.prices) {
            const price = getPrice(data);
            ret = price >= rule.prices[0] && price <= rule.prices[1] ? 3 : -3;
        }
    } else {
        ret = worthy_rate >= MY_WORTHY ? 9 : -9;
    }
    return ret;
}
//值率计算
function calWorthy(data) {
    const worthy = parseInt(data.article_worthy);
    const unworthy = parseInt(data.article_unworthy);
    let worthy_rate = 0;
    //值和不值不同时为零
    if (worthy || unworthy) {
        worthy_rate = (worthy / (worthy + unworthy)).toFixed(2);
    }
    return worthy_rate * 100;
}
//获取商品价格
function getPrice(data){
    const price = data.article_price.match(/[\d.]+/);
    return price?parseInt(price[0]):0;
}
