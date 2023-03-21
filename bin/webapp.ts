import {Construct} from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import {Code, Runtime} from "aws-cdk-lib/aws-lambda";
import {LambdaIntegration, RestApi} from "aws-cdk-lib/aws-apigateway";
//WeChatStack用来进行业务代码发布
export class WeChatStack extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        //业务逻辑通过Lambda的方式发布
        const weChatLambda = new lambda.Function(this, 'MyFunction', {
            runtime: Runtime.NODEJS_16_X,
            handler: 'index.handler',
            description: "Lambda来部署业务逻辑",
            //这里仅为示意，在实际项目中，这里是处理业务逻辑的代码，可以集成其他的代码库
            code: Code.fromInline('exports.handler = function(event, ctx, cb) { return cb(null, "你好" ); }'),
        });
        //申请网关资源
        const apiGateway = new RestApi(this, 'ServiceApiGateway', {
            description: 'API used for wechat',
        })
        //将url路径为wechat的请求交给Lambda处理
        const wechatWeb = apiGateway.root.addResource('wechat')
        wechatWeb.addMethod('GET', new LambdaIntegration(weChatLambda))
    }
}

