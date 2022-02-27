import {Response, Request, NextFunction} from "express";
import {CustomAPIError} from "../errors/custom-api";

const errorHandlerMiddleware = (err: CustomAPIError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  let customError = {
    // set default
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong try again later',
  };

  return res.status(customError.statusCode).json({status: false, message: customError.msg});
};

export default errorHandlerMiddleware;
