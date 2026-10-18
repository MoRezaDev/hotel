import { ConfigService } from '@nestjs/config';
import { LocalDisk } from '@nestjs/storage';

export function createStorageOptions(configService: ConfigService) {
  const appUrl = configService.getOrThrow<string>('appUrl');
  const root = configService.getOrThrow<string>('storage.root');
  return {
    default: 'hotelPhotos',
    disks: {
      hotelPhotos: new LocalDisk({
        root: `${root}/hotel/photos`,
        publicUrl: `${appUrl}/hotel/photos`,
      }),
    },
  };
}
