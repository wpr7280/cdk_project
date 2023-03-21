import {App} from "aws-cdk-lib";
import {BucketStack} from "../bin/mytest/BucketStack";
import {Template} from "aws-cdk-lib/assertions";

describe('Bucket Stack Test', () => {
    const app = new App();
    const bucketStack = new BucketStack(app, 'testBucketDemo', {});
    const template = Template.fromStack(bucketStack);
    // test("create success", () => {
    //     template.hasResource("AWS::S3::Bucket", {})
    // })
    // test("create success props", () => {
    //         template.hasResource("AWS::S3::Bucket", {
    //             DeletionPolicy: 'Retain'
    //         })
    //     }
    // )
    // test("bucket count equal 1", () => {
    //         template.resourceCountIs('AWS::S3::Bucket', 1);
    //     }
    // )
    // test("object like", () => {
    //     template.hasResource("AWS::S3::Bucket", Match.objectLike({
    //         DeletionPolicy:'Retain'
    //     }))
    // })
    // test("object equals", () => {
    //     template.hasResource("AWS::S3::Bucket", Match.objectEquals({
    //         DeletionPolicy:'Retain'
    //     }))
    // })
    // test("anyValue success", () => {
    //     template.hasResource("AWS::S3::Bucket", Match.objectLike({
    //         DeletionPolicy:Match.anyValue()
    //     }))
    // })
    // test("anyValue fail", () => {
    //     template.hasResource("AWS::S3::Bucket", Match.objectLike({
    //         aaa:Match.anyValue()
    //     }))
    // })
    // test("absent success", () => {
    //     template.hasResource("AWS::S3::Bucket", Match.objectLike({
    //         aaa:Match.absent()
    //     }))
    // })


    // const myTemplate = Template.fromString('    {\n' +
    //     '  "Resources": {\n' +
    //     '    "MyBar": {\n' +
    //     '      "Type": "Foo::Bar",\n' +
    //     '      "Properties": {\n' +
    //     '        "Fred": ["Flob", "Cat"]\n' +
    //     '      }\n' +
    //     '    }\n' +
    //     '  }\n' +
    //     '}');
    // test("arrayWith success", () => {
    //     myTemplate.hasResourceProperties('Foo::Bar', {
    //         Fred: Match.arrayWith(['Flob'])
    //     })
    // })
    // test("arrayWith success 02", () => {
    //     myTemplate.hasResourceProperties('Foo::Bar', {
    //         Fred: Match.arrayWith(['Flob','Cat'])
    //     })
    // })
    // test("arrayWith fail", () => {
    //     myTemplate.hasResourceProperties('Foo::Bar', {
    //         Fred: Match.arrayWith(['Cat','Flob'])
    //     })
    // })

    // const jsonTemplate = Template.fromString(' {\n' +
    //     '  "Resources": {\n' +
    //     '    "MyBar": {\n' +
    //     '      "Type": "Foo::Bar",\n' +
    //     '      "Properties": {\n' +
    //     '        "Baz": "{ \\"Fred\\": [\\"Waldo\\", \\"Willow\\"] }"\n' +
    //     '      }\n' +
    //     '    }\n' +
    //     '  }\n' +
    //     '}');
    // test("serializedJson", () => {
    //     jsonTemplate.hasResourceProperties('Foo::Bar', {
    //         Baz: Match.serializedJson({
    //             Fred: Match.arrayWith(["Waldo"]),
    //         }),
    //     });
    // })
    test("matches the snapshot", () => {
        expect(template).toMatchSnapshot();
    });

});
