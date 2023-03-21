import {Construct} from "constructs";
import {Asset} from "aws-cdk-lib/aws-s3-assets";
import * as path from "path";
import {
    AmazonLinuxGeneration,
    AmazonLinuxImage,
    Instance,
    InstanceType,
    InstanceClass,
    InstanceSize,
    SubnetType,
    Vpc
} from "aws-cdk-lib/aws-ec2";

export class ShellAssetResource extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        //1. 引入自定义的脚本user.sh
        const userShell = new Asset(this, "userShellAsset", {
            path: path.join(__dirname, "user.sh")
        });
        const myVpc = new Vpc(this, 'my-cdk-vpc', {
            cidr: '10.0.0.0/16',
            natGateways: 0,
            subnetConfiguration: [
                {name: 'public', cidrMask: 24, subnetType: SubnetType.PUBLIC},
            ],
        });
        const ec2Instance = new Instance(this, "myEC2", {
            instanceType: InstanceType.of(InstanceClass.BURSTABLE2, InstanceSize.MICRO),
            vpc: myVpc,
            machineImage: new AmazonLinuxImage({
                generation: AmazonLinuxGeneration.AMAZON_LINUX_2,
            }),
        });
        //2. 给ec2示例读取shell脚本的权限
        userShell.grantRead(ec2Instance);
        //3. 启动后将脚本从s3上下载到本地
        const userDataPath = ec2Instance.userData.addS3DownloadCommand({
            bucket: userShell.bucket,
            bucketKey: userShell.s3ObjectKey
        });
        //4. 执行脚本
        ec2Instance.userData.addExecuteFileCommand({
            filePath: userDataPath
        })
    }
}