import CustomError from "./customError";

export default class EmptyDataError extends CustomError {
  constructor() {
    super({ message: "NAME AND EMAIL MUST BE PROVIDED!", statusCode: 400 });
  }
}
