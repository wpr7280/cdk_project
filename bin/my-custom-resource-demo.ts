// import {Construct} from "constructs";
// import {Provider} from "aws-cdk-lib/custom-resources";
// import * as lambda from "aws-cdk-lib/aws-lambda";
// import * as path from "path";
// import {CustomResource} from "aws-cdk-lib";
//
// export class MyCustomResource extends Construct {
//     constructor(scope: Construct, id: string) {
//         super(scope, id);
//         const timestamp = new Date().toISOString();
//         const eventFn = new lambda.Function(this, 'eventFn',{
//             //..省略
//         });
//         const statusCompleteCheckFn = new lambda.Function(this, 'statusCompleteCheckFn',{
//             //..省略
//         });
//         const myProvider = new Provider(this,'MyProvider',{
//             onEventHandler:eventFn,
//             isCompleteHandler: statusCompleteCheckFn,        // optional async "waiter"
//         })
//         new CustomResource(this, 'MyResource', { serviceToken: myProvider.serviceToken });
//     }
// }