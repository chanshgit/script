/**
var body = JSON.parse($response.body); 
body.subscriber.subscriptions ={
      "com.monocraft.photocleaner.yearly.5" : {
        "is_sandbox" : false,
        "ownership_type" : "PURCHASED",
        "billing_issues_detected_at" : null,
        "period_type" : "yearly",
        "expires_date" : "2023-05-08T04:19:01Z",
        "grace_period_expires_date" : null,
        "unsubscribe_detected_at" : null,
        "original_purchase_date" : "2022-05-05T04:19:02Z",
        "purchase_date" : "2022-05-05T04:19:01Z",
        "store" : "app_store"
      }
};
body.subscriber.entitlements = {
      "premium" : {
        "grace_period_expires_date" : null,
        "purchase_date" : "2022-05-05T04:19:01Z",
        "product_identifier" : "com.monocraft.photocleaner.yearly.5",
        "expires_date" : "2023-05-08T04:19:01Z"
      }
};*/
/**永久VIP
*^https://api.revenuecat.com/v1/subscribers((?!offerings).)*$
*hostname=api.revenuecat.com
*rewrite_local:^https://api.revenuecat.com/v1/subscribers((?!offerings).)*$ url script-response-body photoclear.js
*
*/
var body = {
  "request_date_ms": 1651724620199,
  "request_date": "2022-05-05T04:23:40Z",
  "subscriber": {
    "non_subscriptions": {},
    "first_seen": "2022-05-05T03:36:05Z",
    "original_application_version": "188",
    "other_purchases": {},
    "management_url": "https://apps.apple.com/account/subscriptions",
    "subscriptions": {
      "com.monocraft.photocleaner.yearly.5": {
        "is_sandbox": false,
        "ownership_type": "PURCHASED",
        "billing_issues_detected_at": null,
        "period_type": "trial",
        "expires_date": "2023-05-08T04:19:01Z",
        "grace_period_expires_date": null,
        "unsubscribe_detected_at": null,
        "original_purchase_date": "2022-05-05T04:19:02Z",
        "purchase_date": "2022-05-05T04:19:01Z",
        "store": "app_store"
      }
    },
    "entitlements": {
      "premium": {
        "grace_period_expires_date": null,
        "purchase_date": "2022-05-05T04:19:01Z",
        "product_identifier": "com.monocraft.photocleaner.yearly.5",
        "expires_date": "2023-05-08T04:19:01Z"
      }
    },
    "original_purchase_date": "2022-05-05T03:35:15Z",
    "original_app_user_id": "$RCAnonymousID:9accc2dc1822463e864c71747e9aab15",
    "last_seen": "2022-05-05T03:36:05Z"
  }
}


body = JSON.stringify(body); 
//console.log(body); 
$done({body});
