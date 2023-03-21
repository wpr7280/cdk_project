import {Construct} from "constructs";
import {DockerImageAsset} from "aws-cdk-lib/aws-ecr-assets";
import * as path from "path";

export class DocketAssetResource extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        const asset = new DockerImageAsset(this, 'MyBuildImage', {
            directory: path.join(__dirname, 'my-image'),
            target:"prod",
            buildArgs:{
                BASE_IMAGE_TAG:"latest"
            }
        });
    }
}