import express from "express"
import multer from "multer"
import fs from "fs"
import { am } from "./actions"
import path from "path"

const tmpDir = "/patches"
try {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir)
  }
} catch (err) {
  console.error(err)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const app = express()

app.use(express.static("public"))

app.post("/upload", multer({ storage: storage }).single("file"), (req, res) => {
  if (req.file) {
    am({
      patchPath: path.join(tmpDir, req.file.filename)
    })
    res.json({ success: `File ${req.file.filename} updated` })
    return
  }
  res.json({ error: "no file" })
  return
})

const server = app.listen(3001, () => {
  console.log("Server ready at: http://localhost:3001")
})
