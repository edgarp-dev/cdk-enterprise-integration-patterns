export const handler = async (event: any = {}): Promise<any> => {
	console.log("Lambda2 received event:", JSON.stringify(event, null, 2));
	// Your logic here
	return;
};
