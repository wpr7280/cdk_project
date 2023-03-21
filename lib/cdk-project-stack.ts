import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Bucket} from "aws-cdk-lib/aws-s3";
import {Ec2Service} from "aws-cdk-lib/aws-ecs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkProjectStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    //  const mybucket = Bucket.fromBucketArn(this,"existingBucketDemo","arn:aws:s3:::test-bucket-wpr-0813")
    // // The code that defines your stack goes here
    //   const mybucket = Bucket.fromBucketName(this,"existingBucketDemo","test-bucket-wpr-0813")
    //   const service = new Ec2Service(this, 'Service', { cluster: myCluster });


    // example resource
    // const queue = new sqs.Queue(this, 'CdkProjectQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
