import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {IBucket} from "aws-cdk-lib/aws-s3";
import {MonitoringFacade} from "cdk-monitoring-constructs";

interface IMonitorStackProps extends StackProps {
    // bucket: IBucket
}

export class MonitorStack extends Stack {
    constructor(scope: Construct, id: string, props: IMonitorStackProps) {
        super(scope, id, props);
        const monitoring = new MonitoringFacade(this, "Monitoring", {})
        // monitoring.monitorS3Bucket({bucket: props.bucket})
    }
}