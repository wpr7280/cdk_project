import {App} from "aws-cdk-lib";
import {Template} from "aws-cdk-lib/assertions";
import {Code, CodeConfig} from "aws-cdk-lib/aws-lambda";
// import {MyLambdaStack} from "../bin/cdk-project";

describe('Mock Asset Test', () => {
    // let fromAssetMock: jest.SpyInstance ;
    // beforeAll(() => {
    // mock the Code calls so tests run quicker
    // let fromAssetMock = jest.spyOn(Code, 'fromAsset').mockReturnValue({
    //     isInline: false,
    //     bind: (): CodeConfig => {
    //         return {
    //             s3Location: {
    //                 bucketName: 'my-bucket',
    //                 objectKey: 'my-key',
    //             },
    //         };
    //     },
    //     bindToResource: () => {
    //         return;
    //     },
    // } as any);
    // // });
    // // afterAll(() => {
    // //     // restore the Code from mock
    // //     fromAssetMock?.mockRestore();
    // // });
    // const app = new App();
    // const lambda = new MyLambdaStack(app, 'mockLambdaStack', {});
    // const template = Template.fromStack(lambda);
    // test('check snapshot', () => {
    //     expect(template).toMatchSnapshot();
    // });
})
