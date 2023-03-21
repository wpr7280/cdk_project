// function onCreate(event){
//     var props = event["ResourceProperties"]
//     console.log("create new resource with props " , props)
//     //TODO 生成资源的创建逻辑
//     var physical_id ;
//     return { 'PhysicalResourceId': physical_id }
// }
// function onUpdate(event){
//     const physicalId = event["PhysicalResourceId"]
//     const props = event["ResourceProperties"]
//     //TODO 更新的逻辑
// }
// function onDelete(event){
//     const physicalId = event["PhysicalResourceId"]
//     const props = event["ResourceProperties"]
//     //TODO 删除逻辑
// }
// export async function handler(event) {
//     if (event.RequestType === 'Create') {
//         return onCreate(event);
//     }
//     if (event.RequestType === 'Update') {
//         return onUpdate(event);
//     }
//     if (event.RequestType === 'Delete') {
//         return onDelete(event);
//     }
//     throw new Error('invalid request type');
// }
//
// export async function  isComplete(event, context){
//     const physicalId = event["PhysicalResourceId"]
//     const requestType = event["RequestType"]
//     //检查资源所处的状态
//     var is_ready = TODO;
//     return { 'IsComplete': is_ready }
// }
//
//
//
//
//
