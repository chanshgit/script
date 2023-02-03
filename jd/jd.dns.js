var body = JSON.parse($response.body); //ToDo....
if(body.data["api.m.jd.com"]) 
body.data["api.m.jd.com"].master ="111.13.76.117";
body.data["api.m.jd.com"].backup={"v4":["36.110.181.220"]};
body = JSON.stringify(body);$done({body}); 