import { SNS } from "aws-sdk";

const sns = new SNS();

interface SQSMessageBody {
	originalMessage: string;
}

interface SQSEventRecord {
	body: string;
}

interface SQSEvent {
	Records: SQSEventRecord[];
}

exports.handler = async (event: SQSEvent) => {
	for (const record of event.Records) {
		const message: SQSMessageBody = JSON.parse(record.body);

		// Modify the message content
		const modifiedMessage = message.originalMessage + " - Modified content";

		// Publish to SNS
		const params = {
			Message: modifiedMessage,
			TopicArn: process.env.TOPIC_ARN,
		};

		try {
			await sns.publish(params).promise();
			console.log("Message published to SNS:", modifiedMessage);
		} catch (err) {
			console.error("Error publishing to SNS:", err);
		}
	}
};
