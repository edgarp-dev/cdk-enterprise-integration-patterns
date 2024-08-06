import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sns from "aws-cdk-lib/aws-sns";
import * as event_sources from "aws-cdk-lib/aws-lambda-event-sources";
import * as path from "path";

export class AppStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Create SQS queue
		const queue = new sqs.Queue(this, "MyQueue", {
			queueName: "MyQueue",
		});

		// Create SNS topic
		const topic = new sns.Topic(this, "MyTopic", {
			topicName: "MyTopic",
		});

		// Create Lambda function
		const lambdaFunction = new lambda.Function(this, "MyFunction", {
			runtime: lambda.Runtime.NODEJS_20_X,
			handler: "index.handler",
			code: lambda.Code.fromAsset(path.join(__dirname, "../lambda"), {
				bundling: {
					image: lambda.Runtime.NODEJS_20_X.bundlingImage,
					command: [
						"bash",
						"-c",
						[
							"npm install",
							"npm run build",
							"cp -r dist/* /asset-output/",
						].join(" && "),
					],
				},
			}),
			environment: {
				TOPIC_ARN: topic.topicArn,
			},
		});

		// Grant Lambda function permissions to publish to the SNS topic
		topic.grantPublish(lambdaFunction);

		// Add SQS event source to the Lambda function
		lambdaFunction.addEventSource(new event_sources.SqsEventSource(queue));

		// Output the SQS queue URL, Lambda function name, and SNS topic ARN
		new cdk.CfnOutput(this, "QueueURL", { value: queue.queueUrl });
		new cdk.CfnOutput(this, "LambdaFunctionName", {
			value: lambdaFunction.functionName,
		});
		new cdk.CfnOutput(this, "TopicARN", { value: topic.topicArn });
	}
}
