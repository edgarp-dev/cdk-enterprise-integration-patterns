import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as eventSources from "aws-cdk-lib/aws-lambda-event-sources";
import * as iam from "aws-cdk-lib/aws-iam";
import { join } from "path";

export class AppStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const queue = new sqs.Queue(this, "MessagesQueue");

		const producerLambda = new lambda.Function(this, "ProducerLambda", {
			functionName: "message-channel-producer",
			runtime: lambda.Runtime.NODEJS_20_X,
			handler: "handler.handler",
			code: lambda.Code.fromAsset(
				join(__dirname, "..", "..", "producer", "dist")
			),
			environment: {
				QUEUE_URL: queue.queueUrl,
			},
		});

		queue.grantSendMessages(producerLambda);

		const consumerLambda = new lambda.Function(this, "ConsumerLambda", {
			functionName: "message-channel-consumer",
			runtime: lambda.Runtime.NODEJS_20_X,
			handler: "handler.handler",
			code: lambda.Code.fromAsset(
				join(__dirname, "..", "..", "consumer", "dist")
			),
		});

		queue.grantConsumeMessages(consumerLambda);

		const cloudWatchLogsPolicy = new iam.PolicyStatement({
			actions: [
				"logs:CreateLogGroup",
				"logs:CreateLogStream",
				"logs:PutLogEvents",
			],
			resources: ["*"],
		});

		producerLambda.addToRolePolicy(cloudWatchLogsPolicy);
		consumerLambda.addToRolePolicy(cloudWatchLogsPolicy);

		consumerLambda.addEventSource(new eventSources.SqsEventSource(queue));
	}
}
