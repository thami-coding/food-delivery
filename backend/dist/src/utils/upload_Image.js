"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
(async function () {
    cloudinary_1.v2.config({
        cloud_name: 'dgdevmfnd',
        api_key: '252186694979437',
        api_secret: '<your_api_secret>'
    });
    const uploadResult = await cloudinary_1.v2.uploader
        .upload('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
        public_id: 'shoes',
    })
        .catch((error) => {
        console.log(error);
    });
    console.log(uploadResult);
})();
