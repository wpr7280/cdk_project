exports.handler = function (event, ctx, cb) {
    const response = require('cfn-response');
    console.log('Received event:\n' + JSON.stringify(event));
    console.log('Received context:\n' + JSON.stringify(ctx));
    var responseData = {};
    response.send(event, ctx, response.SUCCESS, responseData);
}
