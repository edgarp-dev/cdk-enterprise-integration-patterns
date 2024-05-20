import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const sqsClient = new SQSClient({});

export const handler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	const params = {
		MessageBody: JSON.stringify({ message: "Hello from producer!" }),
		QueueUrl: process.env.QUEUE_URL as string,
	};

	try {
		const data = await sqsClient.send(new SendMessageCommand(params));
		console.log(`Message sent to queue: ${data.MessageId}`);
		return {
			statusCode: 200,
			body: JSON.stringify("Message sent successfully!"),
		};
	} catch (err) {
		console.error(err);
		return {
			statusCode: 500,
			body: JSON.stringify("Failed to send message"),
		};
	}
};
