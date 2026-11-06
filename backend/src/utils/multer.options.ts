import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface.js';
import { diskStorage, memoryStorage } from 'multer';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

export function multerMainImageOptions(): MulterOptions {
  if (process.env.NODE_ENV === 'development') {
    return {
      limits: { fileSize: 5 * 1024 * 1024 },
      storage: diskStorage({
        destination: async (req, file, callback) => {
          try {
            const hotelId = req.params.hotelId as string;
            const hotelPath =
              file.fieldname === 'image'
                ? join(process.cwd(), 'upload', hotelId, 'main')
                : join(process.cwd(), 'upload', hotelId, 'images');
            await mkdir(hotelPath, { recursive: true });
            callback(null, hotelPath);
          } catch (err) {
            callback(err as Error, '');
          }
        },
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
    throw new Error('multerOption entries are missing');
  }
}
