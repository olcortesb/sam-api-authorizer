exports.logger = async (event) => {
    console.log('You are authorizer');
    return {
        'statusCode': 200,
        'body': JSON.stringify('OK')
    }
}