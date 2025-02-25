import StatusCode from "../helpers/constants";

interface CustomErrorOptions {
  message?: string;
  additionalData?: Record<string, unknown>;
  statusCode?: number;
  serviceURL?: string;
  serviceStatusCode?: number;
  error?: Error;
}

class CustomError extends Error {
  public stack: string | undefined;
  private _statusCode: number;
  private _additionalData: Record<string, unknown> | undefined;
  private _serviceURL: string | undefined;
  private _serviceStatusCode: number | undefined;
  private _error: Error | undefined;

  constructor({
    message = "Internal Server Error",
    additionalData,
    statusCode = StatusCode.InternalServerError,
    serviceURL,
    serviceStatusCode,
    error,
  }: CustomErrorOptions = {}) {
    if (error instanceof Error) {
      super(message, error.cause as ErrorOptions);
    } else {
      super(message);
    }

    this._statusCode = statusCode;
    this._additionalData = additionalData;
    this._error = error;
    this._serviceURL = serviceURL;
    this._serviceStatusCode = serviceStatusCode;
  }

  public get additionalData(): Record<string, unknown> | undefined {
    return this._additionalData;
  }

  public get statusCode(): number {
    return this._statusCode;
  }

  public get serviceURL(): string | undefined {
    return this._serviceURL;
  }

  public get serviceStatusCode(): number | undefined {
    return this._serviceStatusCode;
  }

  public get error(): Error | undefined {
    return this._error;
  }
}

export default CustomError;
