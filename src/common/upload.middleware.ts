import { Injectable, NestMiddleware } from '@nestjs/common';
import * as multer from 'multer';
import * as path from 'path';

@Injectable()
export class UploadMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const upload = multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join(__dirname, '..', 'uploads', 'images')); 
        },
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
    }).array('images');

    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ status: false, message: err.message });
      }
      next();
    });
  }
}
