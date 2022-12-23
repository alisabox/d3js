export default class AppError extends Error {
  private _statusCode: number;
  private _status: string;

  public get statusCode(): number {
    return this._statusCode;
  }

  public get status(): string {
    return this._status;
  }

  constructor(
    message: string,
    statusCode: number
  ) {
    super(message);

    this._statusCode = statusCode;
    this._status = statusCode.toString().startsWith('4') ? 'Bad Request' : 'Server Error';

    Error.captureStackTrace(this, this.constructor);
  }
}
