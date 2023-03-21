export async function handler(event) {
    if (event.RequestType === 'Create') {
        return onCreate(event);
    }
    if (event.RequestType === 'Update') {
        return onUpdate(event);
    }
    if (event.RequestType === 'Delete') {
        return onDelete(event);
    }
    throw new Error('invalid request type');
}
