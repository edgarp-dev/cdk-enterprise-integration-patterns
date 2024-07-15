export const handler = async (event: any = {}): Promise<any> => {
	console.log("Lambda1 received event:", JSON.stringify(event, null, 2));
	// Your logic here
	return;
};
