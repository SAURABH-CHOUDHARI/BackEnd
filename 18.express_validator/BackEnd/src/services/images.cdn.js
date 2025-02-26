const ImageKit = require("imagekit");
const { PassThrough } = require("stream");
const config = require("../config/config");

const imagekit = new ImageKit({
    publicKey: config.IMAGE_KIT_PUBLIC_KEY,
    privateKey: config.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
});

const uploadBufferStream = async (fileBuffer, fileName) => {
    try {
        const passThroughStream = new PassThrough();
        passThroughStream.end(fileBuffer); 

        const result = await imagekit.upload({
            file: passThroughStream, 
            fileName: fileName,
            folder: "/instagram",
        });

        return result; 
    } catch (error) {
        console.error("Error uploading to ImageKit:", error);
        throw new Error("Image upload failed");
    }
};

module.exports = { uploadBufferStream };