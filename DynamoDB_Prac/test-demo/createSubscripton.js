const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });

const dynamoDB = new AWS.DynamoDB();

const docClient = new AWS.DynamoDB.DocumentClient();

const body = {
    email: "choda.m@gmail.com",
    awsId: "2345234523452",
    plan_code: "M12"
}

const assignTime = () => {
    return new Date(Date.parse(new Date())).toISOString();
};

const stepMonth = () => {
     const result = new Date(assignTime().slice(0,10));
       return new Date(result.setMonth(result.getMonth() + 1)).toISOString().slice(0,10);
};

const plan =[{
    "plan_code":"M12",
    "amount":999,
    "expires":false,
    "interval":1,
    "plan_name":"12 Months Hair Care Plan",
    "product_name":"Complete Hair Care Regimen",
    "app_id":"vedix-dev"
},{"plan_code":"V1","amount":1699,"expires":true,"interval":1,"plan_name":"Trial Pack","product_name":"Complete Hair Care Regimen","app_id":"vedix-dev"},
    {"plan_code":"M3","amount":1499,"expires":false,"interval":1,"plan_name":"3 Months Hair Care Regimen","product_name":"Complete Hair Care Regimen","app_id":"vedix-dev"},
    {"plan_code":"B3","amount":3398,"expires":false,"interval":3,"plan_name":"3 Months Hair Care Regimen - B2G1","product_name":"Complete Hair Care Regimen","app_id":"vedix-dev"},
    {"plan_code":"B5","amount":5097,"expires":false,"interval":5,"plan_name":"5 Months Hair Care Regimen - B3G2","product_name":"Complete Hair Care Regimen","app_id":"vedix-dev"}
];

const appId = 'vedix-dev';

const [choosePlan] = plan.filter((val) => {
    return val.plan_code === body['plan_code'];
});

console.log(choosePlan);
if(typeof choosePlan !== 'undefined'){
    const params = {
            TableName: "subscriptions",
            Item: {
            activated_at: assignTime().slice(0,10),
            amount: choosePlan.amount,
            auto_collect: null,
            created_time: assignTime(),
            currency_code: "INR",
            currency_symbol: "Rs.",
            current_term_ends_at: stepMonth(),
            current_term_starts_at: assignTime().slice(0,10),
            expires_at: choosePlan.expires ? assignTime().slice(0,10) : null,
            interval: choosePlan.interval,
            interval_unit: "months",
            last_billing_at: assignTime().slice(0,10),
            name: `Complete Hair Care Regimen-${choosePlan.plan_name}`,
            next_billing_at: assignTime().slice(0,10),
            payment_terms: 0,
            payment_terms_label: "Due on Receipt",
            status: "live",
            subscription_id:"1231235613123",
            updated_time: assignTime(),
            customer_name: body['email'],
            email: body['email'],
            plan_name: choosePlan.plan_name,
            sub_total: choosePlan.amount,
            is_metered_billing:null,
            app_id: appId,
            awsId: body['awsId'],
            plan_code: body['plan_code']
    }
    };
    docClient.put(params,
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        }
    );
}else{
    console.log("please enter valid plan");
}