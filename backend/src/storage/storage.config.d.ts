import { ConfigService } from '@nestjs/config';
import { LocalDisk } from '@nestjs/storage';
export declare function createStorageOptions(configService: ConfigService): {
    default: string;
    disks: {
        hotelPhotos: LocalDisk;
    };
};
