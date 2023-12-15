const addCors = require('./src/helpers/cors/addCors');
const logger = require('./src/helpers/logger/logger');

const getRequestData = require('./src/helpers/getRequestData/getRequestData');
const { helloWorld } = require('./src/core/handlers/hello-world');

const originHandler = async (event, context) => {
  try {
    logger.info(`start lambda function [${context.functionName}]`);

    const requestData = await getRequestData(event);

    const result = await helloWorld(requestData);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };

  } catch (err) {
    logger.error(err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
}

exports.handler = addCors(originHandler);