
export const GlobalFunction: any = {
	
	successResponse: function (request: any, response: any, data: any = {}, message: string = "", ) {
		
        response.status(200).send({
			success: true,
			StatusMsg: message,
			ResponseType: "SUCCESS",
			data: data
		});
	},
	errorResponse: function (request: any, response: any, statusCode: any = 400, message: string = "") {
		response.status(statusCode).send({
			success: false,
			ResponseType: "ERROR",
			StatusMsg: message
		});
	},
	customisedErrorResponse: function (request: any, response: any, type: any = "", message: any = "", data: any = null) {
		response.status(200).send({
			success: false,
			ResponseType: type,
			StatusMsg: message,
			Data: data
		});
	}
};
//module.exports = GlobalFunction;