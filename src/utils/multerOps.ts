import {Request} from "express";
import multer, {FileFilterCallback} from 'multer';
import path from 'path';
import DatauriParser from "datauri/parser.js";


const imageStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: multerFilter
})


const imageUploadMiddleware = imageUpload.single('image')

const parser = new DatauriParser();
const parsedImage = (reqFile: Express.Multer.File) => parser.format(path.extname(reqFile.originalname).toString(), reqFile.buffer);// turns each file buffer to a URI

export {imageUploadMiddleware, parsedImage};
