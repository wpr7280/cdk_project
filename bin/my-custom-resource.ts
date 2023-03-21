// import {Construct} from "constructs";
// import * as lambda from "aws-cdk-lib/aws-lambda";
// import {Code} from "aws-cdk-lib/aws-lambda";
// import {CustomResource, CustomResourceProvider} from "aws-cdk-lib";
//
// export class MyCustomResource extends Construct {
//     constructor(scope: Construct, id: string) {
//         super(scope, id);
//         const timestamp = new Date().toISOString();
//         const fn = new lambda.Function(this, 'MyFunction', {
//             runtime: lambda.Runtime.NODEJS_16_X,
//             handler: 'index.handler',
//             code: Code.fromInline('exports.handler = function(event, ctx, cb) {    ' +
//                 '    const response = require(\'cfn-response\');\n' +
//                 '    console.log(\'Received event:\\n\' + JSON.stringify(event));\n' +
//                 '    console.log(\'Received context:\\n\' + JSON.stringify(ctx));\n' +
//                 '    var responseData = {};\n' +
//                 '    response.send(event, ctx, response.SUCCESS, responseData); }'),
//             description: `Generated on ${timestamp} for Lambda`
//         });
//         new CustomResource(this, "MyResource",{
//             serviceToken: fn.functionArn
//         });
//     }
// }