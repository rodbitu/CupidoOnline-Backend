import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.userTable,
    Key: {
      userId: event.pathParameters.userId,
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});