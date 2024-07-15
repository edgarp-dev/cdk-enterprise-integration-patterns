import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

export class AppStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const lambdaFunction1 = new NodejsFunction(this, "LambdaFunction1", {
			runtime: lambda.Runtime.NODEJS_20_X,
			entry: join(__dirname, "lambda1", "index.ts"),
			handler: "handler",
		});

		const lambdaFunction2 = new NodejsFunction(this, "LambdaFunction2", {
			runtime: lambda.Runtime.NODEJS_16_X,
			entry: join(__dirname, "lambda2", "index.ts"),
			handler: "handler",
		});

		const eventBus = new events.EventBus(this, "MyEventBus");

		new events.Rule(this, "RouteToLambda1", {
			eventBus,
			eventPattern: {
				detail: {
					destination: [1],
				},
			},
			targets: [new targets.LambdaFunction(lambdaFunction1)],
		});

		new events.Rule(this, "RouteToLambda2", {
			eventBus,
			eventPattern: {
				detail: {
					destination: [2],
				},
			},
			targets: [new targets.LambdaFunction(lambdaFunction2)],
		});
	}
}
