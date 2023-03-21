import {Construct} from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import {Code, Runtime} from "aws-cdk-lib/aws-lambda";
import {AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId} from "aws-cdk-lib/custom-resources";
import {Topic} from "aws-cdk-lib/aws-sns";
import {EmailSubscription} from "aws-cdk-lib/aws-sns-subscriptions";

export class HookCustomResource extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        const fn = new lambda.Function(this, 'MyFunction', {
            runtime: Runtime.NODEJS_16_X,
            handler: 'index.handler',
            description: "hook test update",
            code: Code.fromInline('exports.handler = function(event, ctx, cb) { return cb(null, "hi"); }'),
        });
        const fn2 = new lambda.Function(this, 'NewFunction', {
            runtime: Runtime.NODEJS_16_X,
            handler: 'index.handler',
            description: "test",
            code: Code.fromInline('exports.handler = function(event, ctx, cb) { return cb(null, "hi"); }'),
        });
        const myTopic = new Topic(this, "HookTopic", {
            topicName: "hooktest",
            displayName: "test"
        });
        myTopic.addSubscription(new EmailSubscription("peirongw@amazon.com"));
        const myAwsCustomRes = new AwsCustomResource(this, 'MyAwsCustomResource', {
            onCreate: {
                service: 'SNS',
                action: 'publish',
                parameters: {
                    Message: "MyAwsCustomResource create event trigger",
                    TopicArn: myTopic.topicArn
                },
                physicalResourceId: PhysicalResourceId.of("testSNS")
            },
            onUpdate: {
                service: 'SNS',
                action: 'publish',
                parameters: {
                    Message: "MyAwsCustomResource update event trigger",
                    TopicArn: myTopic.topicArn
                },
                physicalResourceId: PhysicalResourceId.of("testSNS"  )
            },
            policy: AwsCustomResourcePolicy.fromSdkCalls({
                resources: AwsCustomResourcePolicy.ANY_RESOURCE,
            }),
        });
        myAwsCustomRes.node.addDependency(fn)
    }
}