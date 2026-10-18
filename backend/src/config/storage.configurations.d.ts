declare const _default: () => {
    appUrl: string;
    storage: {
        driver: string;
        root: string;
        signingKey: string | undefined;
        s3: {
            endpoint: string | undefined;
            region: string;
            photosBucket: string;
            privateBucket: string;
            photosUrl: string | undefined;
        };
    };
};
export default _default;
