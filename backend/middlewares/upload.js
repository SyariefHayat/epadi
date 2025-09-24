const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const path = require('path');
const cloudinary = require('../config/cloudinary');

const getFolderName = (fieldname) => {
    switch (fieldname) {
        case 'profilePhoto':
            return 'epadi/farmer/profile';
        default:
            return 'epadi/others';
    }
};

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const folder = getFolderName(file.fieldname);
        const filename = `${Date.now()}-${path.parse(file.originalname).name}`;

        if (file.mimetype === 'application/pdf') {
            return {
                folder,
                public_id: filename,
                resource_type: 'raw',
                format: 'pdf',
                type: 'upload',
            };
        } else {
            return {
                folder,
                public_id: filename,
                format: 'webp',
                transformation: [
                    {
                        quality: 'auto:low',
                        fetch_format: 'auto',
                    }
                ],
            };
        }
    },
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    const isImage = /jpeg|jpg|png/.test(ext.slice(1)) && /jpeg|jpg|png/.test(mime.split('/')[1]);
    const isPDF = mime === 'application/pdf' && ext === '.pdf';

    if (isImage || isPDF) {
        cb(null, true);
    } else {
        cb(new Error('Only images (jpg, jpeg, png) and PDF files are allowed'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { 
        fileSize: 10 * 1024 * 1024, // 10MB
    },
});

module.exports = upload;