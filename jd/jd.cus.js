let body = JSON.parse($response.body);

body.rs.afterBeginLimitTime = false;
body.rs.currentTimeAfterOrderLimitTime = false;
body.rs.afterOrderLimitTime = false;
body.rs.baiYuanEndDate = "2024-10-31 00:00:00";

body = JSON.stringify(body);
$done({body});