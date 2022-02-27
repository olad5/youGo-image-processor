import {Router} from "express";
import {uploadImage} from "../controllers/uploadImageController";

const router: Router = Router()
router.post('/upload-image', uploadImage)

export default router
