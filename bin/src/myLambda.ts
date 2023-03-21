import * as response from 'cfn-response';

export async function handler(event, context) {
    var responseData = {};
    try {
        switch (event.RequestType) {
            case 'Create':
                //创建资源业务逻辑 TODO
                response.send(event, context, response.SUCCESS, responseData);
                break;
            case 'Update':
                //  更新配置 TODO
                response.send(event, context, response.SUCCESS, responseData);
                break;
            case 'Delete':
                // 删除资源 TODO
                response.send(event, context, response.SUCCESS, responseData);
                break;
            default:
                response.send(event, context, response.FAILED, responseData);
        }
    } catch (err) {
        response.send(event, context, response.FAILED, responseData);
    }
}