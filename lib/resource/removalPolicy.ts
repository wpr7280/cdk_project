import {Construct} from "constructs";
import {RemovalPolicy, Stack, StackProps} from "aws-cdk-lib";
import {Bucket} from "aws-cdk-lib/aws-s3";

export class RemovalPolicyStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const bucket = new Bucket(this, 'Bucket', {
            bucketName: 'removal-policy-test' ,
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true
        });
    }
}