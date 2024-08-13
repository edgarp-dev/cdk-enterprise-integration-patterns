import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sns from "aws-cdk-lib/aws-sns";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sns_subscriptions from "aws-cdk-lib/aws-sns-subscriptions";

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const messageEndpoint = new sns.Topic(this, "MySnsTopic", {
			displayName: "My SNS Topic",
		});

		const appReceiverr = new lambda.Function(this, "MyLambdaFunction", {
			runtime: lambda.Runtime.NODEJS_18_X, // Choose the Node.js runtime version
			code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          console.log('Received SNS message:', JSON.stringify(event, null, 2));
          return { statusCode: 200, body: JSON.stringify('Message logged') };
        };
      `),
			handler: "index.handler",
		});

		messageEndpoint.addSubscription(
			new sns_subscriptions.LambdaSubscription(appReceiverr)
		);
	}
}
