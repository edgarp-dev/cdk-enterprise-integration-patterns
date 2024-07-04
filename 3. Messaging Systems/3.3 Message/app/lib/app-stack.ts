import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { join } from "path";

export class AppStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const myQueue = new sqs.Queue(this, "MySqsQueue", {
			visibilityTimeout: cdk.Duration.seconds(300),
		});

    const myLambda = new lambda.Function(this, "ProducerLambda", {
      functionName: "messaging-producer",
			runtime: lambda.Runtime.NODEJS_20_X,
			handler: "handler.handler",
			code: lambda.Code.fromAsset(
				join(__dirname, "..", "..", "producer", "dist")
			),
			environment: {
				QUEUE_URL: myQueue.queueUrl,
			},
		});

		myQueue.grantSendMessages(myLambda);
	}
}
