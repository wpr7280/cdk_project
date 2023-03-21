// import {Construct} from "constructs";
// import * as lambda from "aws-cdk-lib/aws-lambda";
// import {Code} from "aws-cdk-lib/aws-lambda";
// import {CustomResource, CustomResourceProvider, CustomResourceProviderRuntime} from "aws-cdk-lib";
// import {AwsCustomResource} from "aws-cdk-lib/custom-resources";
//
// export class MyCustomResource extends Construct {
//     constructor(scope: Construct, id: string) {
//         super(scope, id);
//         const timestamp = new Date().toISOString();
//         const resourceType = 'Custom::Sum';
//         const serviceToken = CustomResourceProvider.getOrCreateProvider(this, resourceType, {
//             codeDirectory: `${__dirname}/provider-handler`,
//             runtime: CustomResourceProviderRuntime.NODEJS_16_X,
//         })
//         const resource = new CustomResource(this, 'Resource', {
//             resourceType: resourceType,
//             serviceToken: serviceToken.serviceToken,
//             properties: {}
//         });
//     }
// }