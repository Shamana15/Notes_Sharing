const express = require("express");
const router = express.Router();

const Note = require("../models/Note");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"uploads/");
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+"-"+file.originalname);
  }
});

const upload = multer({storage});

// Upload
router.post(
  "/upload",
  auth,
  upload.single("file"),
  async(req,res)=>{
    try{

      if(!req.file){
        return res.status(400).json("No file uploaded");
      }

      const {title,subject,semester} = req.body;

      const note = await Note.create({
        title,
        subject,
        semester,
        fileUrl:req.file.path,
        uploadedBy:req.user.id
      });

      res.json(note);

    }catch(err){
      console.log(err);
      res.status(500).json("Upload failed");
    }
});

// Get notes
router.get("/", async(req,res)=>{
  const notes = await Note
    .find()
    .populate("uploadedBy","name");

  res.json(notes);
});

module.exports = router;
