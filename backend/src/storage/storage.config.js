import { LocalDisk } from '@nestjs/storage';
export function createStorageOptions(configService) {
    const appUrl = configService.getOrThrow('appUrl');
    const root = configService.getOrThrow('storage.root');
    return {
        default: 'private',
        disks: {
            hotelPhotos: new LocalDisk({
                root: `${root}/hotel/photos`,
                publicUrl: `${appUrl}/hotel/photos`,
            }),
        },
    };
}
//# sourceMappingURL=storage.config.js.map