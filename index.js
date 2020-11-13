const isLambda = !!process.env.LAMBDA_TASK_ROOT;


module.exports.updateLambdaEnv = async ({functionName, newData}) => {
  // Credit: https://stackoverflow.com/a/42504551/10671200
  if (!isLambda) {
    throw new Error("Function is not running in AWS Lambda environment")
  }
  const AWS = require('aws-sdk')
	const lambda = new AWS.Lambda()
  const params = {
    FunctionName: functionName,
    Environment: {
      Variables: newData,
    },
  }
  try {
    await lambda.updateFunctionConfiguration(params).promise()
    
    const response = {
      body: 'Update env successfully!',
    }
    return response
  } catch (e) {
    throw e;
  }
}
