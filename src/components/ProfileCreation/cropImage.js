// cropImage.js

export default function getCroppedImg(imageSrc, pixelCrop) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.setAttribute('crossOrigin', 'anonymous'); // for cross-origin images

        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;

            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );

            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                const fileUrl = URL.createObjectURL(blob);
                resolve(fileUrl);
            }, 'image/jpeg');
        };

        image.onerror = () => {
            reject(new Error('Failed to load image'));
        };
    });
}
