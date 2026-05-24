import multer from "multer";

export const upload = multer({
    storage: multer.memoryStorage(), //stored the file temporary thats why we need to use memory storage
    limits: {
        fileSize: 3 * 1024 * 1024 //3mb
    }
}) 