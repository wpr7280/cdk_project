import {App, Duration, RemovalPolicy, Stack, StackProps} from "aws-cdk-lib";
import {Bucket} from "aws-cdk-lib/aws-s3";
import {Queue} from "aws-cdk-lib/aws-sqs";

export class BucketStack extends Stack {
    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);
        new Bucket(this, 'Bucket', {
            removalPolicy: RemovalPolicy.RETAIN
        });
        const queue = new Queue(this, 'CdkProjectQueue', {
            visibilityTimeout: Duration.seconds(300)
        });
    }
}