class apiResponse {
  constructor(message = "success", statusCode, data) {
    this.message = message;
    this.statusCode = statusCode || 200;
    this.data = data;
    this.success = statusCode < 400;
  }
}
export default apiResponse;
