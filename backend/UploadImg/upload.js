const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');

const storage = multer.diskStorage({ //multers disk storage settings
    destination: './public/image/products',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
});

const upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Only images are allowed'));
        }
        else return cb(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 1024
    },
});

// upload.field for upload more fields
app.post('/', upload.single('image'), async (req, res, err) => {
    console.log(req.file);
    // handle err ??? how 
    res.status(200).json({
        success: true,
        data: req.file.filename,
        session: req.session
    });
});

app.listen(process.env.PORT || 5006, (err) => {
    if (err) throw err;
    else console.log("Upload image service listen on port 5006...");
});