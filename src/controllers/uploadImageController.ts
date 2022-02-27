import {Response, Request} from "express";// these are express types
import {imageUploadMiddleware} from "../utils/multerOps";

const uploadImage = async (req: Request, res: Response): Promise<void> => {
  imageUploadMiddleware(req, res, async function (err) {
    try {
      const image = req.file
      console.log(image)
      if (!image) {
        return res.status(400).json({message: 'please upload an image', })
      }
      return res.status(200).json({message: 'image received', image: image})
    } catch (error) {
      throw error
    }
  })

}


export {uploadImage}
