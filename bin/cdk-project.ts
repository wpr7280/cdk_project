#!/usr/bin/env node
import {
    App,
    SecretValue,
    Stack,
    StackProps
} from "aws-cdk-lib";
import {CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";
import {Construct} from "constructs";

const app = new App();

export class MyPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        const pipeline = new CodePipeline(this, 'MyCDKPipeline', {
            pipelineName: 'MyCDKPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub('wpr7280/cdk_project', 'pipeline_01', {
                    authentication: SecretValue.secretsManager('githubToken'),
                }),
                commands: ['npm ci',
                    'npm run build',
                    'npx cdk synth',]
            })
        });
    }
}

new MyPipelineStack(app, 'MyCDKPipelineStack');
