import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {Bucket, IBucket} from "aws-cdk-lib/aws-s3";

export class WebStack extends Stack {
    public readonly bucket: IBucket;
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        this.bucket = new Bucket(this, "fileBucket", {});
        this.exportValue(this.bucket.bucketName);
    }
}