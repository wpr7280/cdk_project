import {Construct} from "constructs";
import {AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId} from "aws-cdk-lib/custom-resources";
import {Topic} from "aws-cdk-lib/aws-sns";
import {EmailSubscription} from "aws-cdk-lib/aws-sns-subscriptions";

export class MyAWSCustomResource extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        const myTopic = new Topic(this, "TestTopic", {
            topicName: "test",
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
                physicalResourceId: PhysicalResourceId.of("testSNS-" + Date.now().toString())
            },
            onUpdate: {
                service: 'SNS',
                action: 'publish',
                parameters: {
                    Message: "MyAwsCustomResource update event trigger",
                    TopicArn: myTopic.topicArn
                },
                physicalResourceId: PhysicalResourceId.of("testSNS-" + Date.now().toString())
            },
            policy: AwsCustomResourcePolicy.fromSdkCalls({
                resources: AwsCustomResourcePolicy.ANY_RESOURCE,
            }),
        });
    }
}