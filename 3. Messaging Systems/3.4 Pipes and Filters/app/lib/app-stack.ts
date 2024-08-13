import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sns from "aws-cdk-lib/aws-sns";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sns_subscriptions from "aws-cdk-lib/aws-sns-subscriptions";
import * as lambda_event_sources from "aws-cdk-lib/aws-lambda-event-sources";

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Create SNS Topic
		const topic = new sns.Topic(this, "FilterTopic");

		// Create SQS Queue
		const queue = new sqs.Queue(this, "FilterQueue");

		// Create Lambda Function 1 (Filter 1)
		const filter1 = new lambda.Function(this, "Filter1Function", {
			runtime: lambda.Runtime.NODEJS_20_X,
			code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          console.log("Filter 1 received:", JSON.stringify(event, null, 2));
          const transformedMessage = { message: "Processed by Filter 1", ...event.Records[0].Sns };
          return transformedMessage;
        };
      `),
			handler: "index.handler",
		});

		// Create Lambda Function 2 (Filter 2)
		const filter2 = new lambda.Function(this, "Filter2Function", {
			runtime: lambda.Runtime.NODEJS_20_X,
			code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          console.log("Filter 2 received:", JSON.stringify(event, null, 2));
          const transformedMessage = { message: "Processed by Filter 2", ...event.Records[0] };
          console.log("Final processed message:", transformedMessage);
          return transformedMessage;
        };
      `),
			handler: "index.handler",
		});

		// Subscribe Lambda 1 (Filter 1) to SNS Topic
		topic.addSubscription(new sns_subscriptions.LambdaSubscription(filter1));

		// Add SQS Queue as a trigger for Lambda 2 (Filter 2)
		filter2.addEventSource(new lambda_event_sources.SqsEventSource(queue));

		// Add SQS Queue as a Dead Letter Queue for Filter 1's Lambda function
		filter1.addEventSource(
			new lambda_event_sources.SnsEventSource(topic, {
				deadLetterQueue: queue,
			})
		);
	}
}
