import { SQSEvent, SQSHandler } from "aws-lambda";

export const handler = async (event: SQSEvent): Promise<void> => {
	for (const record of event.Records) {
		console.log(`Received message: ${record.body}`);
	}
};
