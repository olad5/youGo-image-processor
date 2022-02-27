import {Response, Request, NextFunction} from "express";
import {imageUploadMiddleware} from "../utils/multerOps";
import {CustomAPIError} from "../errors/custom-api";

const uploadImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  imageUploadMiddleware(req, res, async function (err) {
    const image = req.file
    if (!image) {
      return next(new CustomAPIError('please upload an image', 400))
    }

    return res.status(200).json({status: true, message: 'image received', image: image})
  })

}

export {uploadImage}
