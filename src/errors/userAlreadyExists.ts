import CustomError from "./customError";

export default class UserAlreadyExistsError extends CustomError {
  constructor() {
    super({ message: "USER ALREADY EXISTS!", statusCode: 400 });
  }
}
