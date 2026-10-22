import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface.js';
import { diskStorage, memoryStorage } from 'multer';

export function multerMainImageOptions(): MulterOptions {
  if (process.env.NODE_ENV === 'development') {
    return {
      limits: { fileSize: 5 * 1024 * 1024 },
      storage: diskStorage({
        destination: (req, file) => {},
        filename(req, file, callback) {
          callback(null, `main-${file.originalname}`);
        },
      }),
    };
  } else if (process.env.NODE_ENV === 'production') {
    return {
      limits: { fileSize: 5 * 1024 * 1024 },
      storage: memoryStorage(),
    };
  } else {
    throw new Error(' multerOption entries are missing');
  }
}
