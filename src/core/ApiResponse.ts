import { Response } from 'express'

export enum StatusCode {
  SUCCESS = '200',
  FAILURE = '500',
  RETRY = '404',
  INVALID_ACCESS_TOKEN = '401',
  CONFLICT = '409',
  BAD_REQUEST = '400',
  FORBIDDEN = '403',
}

export enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
  CONFLICT = 409,
}

export class ApiResponse {
  constructor(
    protected statusCode: StatusCode,
    protected status: ResponseStatus,
    protected message: string,
  ) {}

  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T,
    headers: { [key: string]: string },
  ): Response {
    for (const [key, value] of Object.entries(headers)) res.append(key, value)
    return res.status(this.status).json(ApiResponse.sanitize(response))
  }

  public send(
    res: Response,
    headers: { [key: string]: string } = {},
  ): Response {
    res.statusMessage = this.message
    return this.prepare<ApiResponse>(res, this, headers)
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T
    Object.assign(clone, response)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete clone.status
    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i]
    return clone
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = 'Authentication Failure') {
    super(StatusCode.INVALID_ACCESS_TOKEN, ResponseStatus.UNAUTHORIZED, message)
  }
  
  send(res: Response, headers: { [key: string]: string } = {}): Response {
    res.statusMessage = this.message
    return super.prepare<AuthFailureResponse>(res, this, headers)
  }
}

export class NotFoundResponse extends ApiResponse {
  constructor(message = 'Not Found') {
    super(StatusCode.RETRY, ResponseStatus.NOT_FOUND, message)
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    res.statusMessage = this.message
    return super.prepare<NotFoundResponse>(res, this, headers)
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message = 'Forbidden') {
    super(StatusCode.FORBIDDEN, ResponseStatus.FORBIDDEN, message)
  }
  
  send(res: Response, headers: { [key: string]: string } = {}): Response {
    res.statusMessage = this.message
    return super.prepare<ForbiddenResponse>(res, this, headers)
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Parameters') {
    super(StatusCode.BAD_REQUEST, ResponseStatus.BAD_REQUEST, message)
  }
  
  send(res: Response, headers: { [key: string]: string } = {}): Response {
    res.statusMessage = this.message
    return super.prepare<BadRequestResponse>(res, this, headers)
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = 'Internal Error') {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message)
  }
  
  send(res: Response, headers: { [key: string]: string } = {}): Response {
    res.statusMessage = this.message
    return super.prepare<InternalErrorResponse>(res, this, headers)
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message)
  }
  
  send(res: Response, headers: { [key: string]: string } = {}): Response {
    res.statusMessage = this.message
    return super.prepare<SuccessMsgResponse>(res, this, headers)
  }
}

export class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message)
  }
  
  send(res: Response, headers: { [key: string]: string } = {}): Response {
    res.statusMessage = this.message
    return super.prepare<FailureMsgResponse>(res, this, headers)
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(message: string, private data: T) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message)
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    res.statusMessage = this.message
    return super.prepare<SuccessResponse<T>>(res, this, headers)
  }
}

export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = 'refresh_token'

  constructor(message = 'Access token invalid') {
    super(
      StatusCode.INVALID_ACCESS_TOKEN,
      ResponseStatus.UNAUTHORIZED,
      message,
    )
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    headers.instruction = this.instruction
    return super.prepare<AccessTokenErrorResponse>(res, this, headers)
  }
}

export class TokenRefreshResponse extends ApiResponse {
  constructor(
    message: string,
    private accessToken: string,
    private refreshToken: string,
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message)
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    res.statusMessage = this.message
    return super.prepare<TokenRefreshResponse>(res, this, headers)
  }
}

export class ConflictResponse extends ApiResponse {
  constructor(message = 'Already exists') {
    super(StatusCode.CONFLICT, ResponseStatus.CONFLICT, message)
  }
  
  send(res: Response, headers: { [key: string]: string } = {}): Response {
    res.statusMessage = this.message
    return super.prepare<ConflictResponse>(res, this, headers)
  }
}
