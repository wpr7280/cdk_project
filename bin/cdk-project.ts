#!/usr/bin/env node
import {
    App,
    aws_ec2,
    aws_iam,
    CfnOutput,
    CfnParameter,
    CustomResource,
    Duration,
    SecretValue,
    Stack,
    StackProps
} from "aws-cdk-lib";
import {Bucket} from "aws-cdk-lib/aws-s3";
import {Code, Runtime, Function} from "aws-cdk-lib/aws-lambda";
import {AuroraMysqlEngineVersion, Credentials, DatabaseCluster, DatabaseClusterEngine} from "aws-cdk-lib/aws-rds";
import {AmazonLinuxGeneration, AmazonLinuxImage, Instance, SubnetType, Vpc} from "aws-cdk-lib/aws-ec2";
import {ParameterTier, ParameterType, StringListParameter, StringParameter} from "aws-cdk-lib/aws-ssm";
import {Secret} from "aws-cdk-lib/aws-secretsmanager";
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from "path";
import {describe} from "aws-cdk/lib/commands/docs";
// import {MyCustomResource} from "./my-custom-resource";
import {MyAWSCustomResource} from "./my-aws-custom-resource";
import {HookCustomResource} from "./HookCustomResourceProvider";
import {AssetsResource} from "./assets/GithubTest";
import {Asset} from "aws-cdk-lib/aws-s3-assets";
import {InstanceClass, InstanceSize, InstanceType} from "aws-cdk-lib/aws-ec2/lib/instance-types";
import {ShellAssetResource} from "./assets/userShell";
import {BucketStack} from "./mytest/BucketStack";
import {ManagedPolicy, Policy} from "aws-cdk-lib/aws-iam";
import {Queue} from "aws-cdk-lib/aws-sqs";
import {WeChatStack} from "./webapp";
import {CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";
import {Construct} from "constructs";

// const app = new cdk.App();

// const webStack = new WebStack(app,'WebStack',{})
// const monitorStack = new MonitorStack(app, 'MonitorStack', {
//     // bucket: webStack.bucket,
// });
// new RemovalPolicyStack(app,'RemovalPolicyStack',{})

// const parentStack = new Stack(app, "MyParentStack");
// const childStack = new Stack(parentStack, "MyChildStack");

// export class CdkIdentifiersStack extends Stack {
//     constructor(scope: App, id: string, props?: StackProps) {
//         super(scope, id, props);
//         const databasePort = new CfnParameter(this, 'databasePort', {
//             type: 'Number',
//             description: 'The database port',
//             default: 3306,
//             allowedValues: ['3305', '3306', '3307', '3308'],
//         });
//         console.log('database port 👉', databasePort.valueAsString);
// const fn = new lambda.Function(this, 'MyFunction', {
//     runtime: Runtime.NODEJS_16_X,
//     handler: 'index.handler',
//     description:"test",
//     code: Code.fromInline('exports.handler = function(event, ctx, cb) { return cb(null, "hi"); }'),
//     // 👇 将databasePort作为Lambda的环境变量进行传递
//     environment: {
//         databasePort: databasePort.valueAsString,
//     }
// });
//     }
// }

// export class CdkContextStack extends Stack {
//     constructor(scope: App, id: string, props?: StackProps) {
//         super(scope, id, props);
//         console.log('accessing context 👉', process.env.CDK_DEFAULT_ACCOUNT);
//     }
// }

//
// const app = new App();
//
// const stack = new CdkContextStack(app, 'cdk-context-stack-dev', {
//     stackName: 'cdk-context-stack',
// });

// const app = new App();
// const myEnv = {
//     account: process.env.ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
//     region: process.env.REGION || process.env.CDK_DEFAULT_REGION,
// }
//
// interface DBStackProps extends StackProps {
//     vpcId: string,
//     instanceType: string
// }
//
// export class DBStack extends Stack {
//     constructor(scope: App, id: string, props?: DBStackProps) {
//         super(scope, id, props);
//         console.log('DBStack vpcId:👉', props?.vpcId);
//         console.log('DBStack instance:👉', props?.instanceType);
//     }
// }
// const properties = require(`../env/${process.env.DEPLOYMENT_ENV}.json`);
//
// new DBStack(app, `${process.env.DEPLOYMENT_ENV}-DB`, {
//     env: myEnv,
//     vpcId: properties.vpcId,
//     instanceType: properties.instanceType,
// });

// const vpcId = app.node.tryGetContext('vpc-id') ?? 'vpc-2f09a348';
// const instantType = app.node.tryGetContext('instance-type') ?? 't3.micro';
// const env = {
//     account: '123456789013',
//     region: 'us-east-1',
// };
// // Create our DEV RDS instance
// new DbStack(app, 'DevDb', {
//     env: devEnv,
//     vpcId: devVpcId,
//     instanceType: instantType,
// });


// export class CdkSSMParametersStack extends Stack {
//     constructor(scope: App, id: string, props?: StackProps) {
//         super(scope, id, props);
//         const emailParam = new StringParameter(this, 'alerts-email-param', {
//             parameterName: '/my-site/alerts-email-dev',
//             stringValue: 'dev-email@example.com',
//             description: 'the email used for alerting for dev',
//             type: ParameterType.STRING,
//             tier: ParameterTier.STANDARD,
//             allowedPattern: '.*',
//         });
//
//         const environmentsParam = new StringListParameter(
//             this,
//             'environments-param',
//             {
//                 parameterName: '/my-site/environments',
//                 stringListValue: ['dev', 'test', 'prod', 'gamma'],
//                 tier: ParameterTier.ADVANCED,
//             },
//         );
//         const ssmDBPassword = StringParameter.fromSecureStringParameterAttributes(this, 'ssmDBPassword',
//             {parameterName: '/my-site/db-password', version: 1},
//         );
//         const ssmEmail = StringParameter.fromStringParameterAttributes(this,"ssmEmail",{
//             parameterName: '/my-site/alerts-email-dev'
//         })
//         new CfnOutput(this, 'ssmDBPasswordOutput', {
//             value: ssmDBPassword.parameterName,
//         });
//         new CfnOutput(this, 'ssmEmailOutput', {
//             value: ssmEmail.stringValue,
//         });
//     }
// }
//
// const app = new App();
// new CdkSSMParametersStack(app, "ssm-parameters")


// 👇 get access to the secret object
// const dbPasswordSecret = Secret.fromSecretNameV2(this, 'db-pwd-id', 'databasePassword',);
// Secret.fromSecretPartialArn(
//     this,
//     'db-pwd-id',
//     'arn:aws:secretsmanager:ap-northeast-1:919598887196:secret:databasePassword',
// );
// Secret.fromSecretCompleteArn(
//     this,
//     'db-pwd-id',
//     'arn:aws:secretsmanager:ap-northeast-1:919598887196:secret:databasePassword-CGJh2X',
// );
// export class CDKCustomResourceStack extends Stack {
//     constructor(scope: App, id: string, props?: StackProps) {
//         super(scope, id, props);
//         // new MyCustomResource(this, "custom-resource");
//         // new MyAWSCustomResource(this, "aws-custom-resource");
//         // new HookCustomResource(this, "hook-custom-resource")
//         new AssetsResource(this,"asset-resource")
//         // new ShellAssetResource(this,"user-ec2-shell");
//     }
// }
// export class MyLambdaStack extends Stack {
//     constructor(scope: App, id: string, props?: StackProps) {
//         super(scope, id, props);
//         const fn = new Function(this, 'MyAssetsFunction', {
//             runtime: Runtime.NODEJS_16_X,
//             handler: 'index.handler',
//             code: Code.fromAsset(path.join(__dirname, 'assets/lambdaHandler')),
//         });
//     }
// }
// export class MyDrfitStack extends Stack {
//     constructor(scope: App, id: string, props?: StackProps) {
//         super(scope, id, props);
//         new Queue(this, 'temp1Queue', {
//             visibilityTimeout: Duration.seconds(300),
//         });
//
//         // new Queue(this, 'temp2Queue', {
//         //     visibilityTimeout: Duration.seconds(300)
//         // });
//
//         new Queue(this, 'temp3Queue', {
//             visibilityTimeout: Duration.seconds(480),
//         });
//     }
// }

// const app = new App();
// new MyDrfitStack(app, "driftTest")
// new BucketStack(app, "bucketTest")
// new CDKCustomResourceStack(app,"customResourceStack")
// new WeChatStack(app,"weChat");

const app = new App();
export class MyPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        const pipeline = new CodePipeline(this, 'MyCDKPipeline', {
            pipelineName: 'MyCDKPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub('wpr7280/cdk_project', 'test01',{
                    authentication:  SecretValue.secretsManager('githubToken'),
                }),
                commands: ['npx cdk synth']
            })
        });
    }
}
new MyPipelineStack(app, 'MyCDKPipelineStack');
