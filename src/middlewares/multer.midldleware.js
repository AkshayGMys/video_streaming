import multer from "multer";

//cb below is known as callback function
//The below code is to configure multer to store files in disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // We are keeping the same name as the file name but this is dangerous if multiple users upload files with the same name, it will overwrite the existing file. In production, it's better to generate a unique name for each file.
  },
});

export const upload = multer({ storage }); 
// multer({ storage: storage }) returns a function that is stored in upload variable, this function can be used as a middleware in routes to handle file uploads. The storage option is set to the storage configuration we defined above, which tells multer to store the uploaded files in the specified destination with the specified filename.
