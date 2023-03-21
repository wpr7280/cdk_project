import {Construct} from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";

export class AssetsResource extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        const fn = new lambda.Function(this, 'MyAssetsFunction', {
            runtime: lambda.Runtime.NODEJS_16_X,
            handler: 'index.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, 'lambdaHandler')),
        });
    }
}