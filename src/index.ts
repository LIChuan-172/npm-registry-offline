import express from "express"
import multer from "multer"
import fs from "fs"
import { InputType, am, clear, generateOldPackagesPatch } from "./actions"
import path from "path"

const PORT = process.env.PORT_ADMIN || 3000

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

app.get("/clear", (req, res) => {
  clear()
  res.json({ success: "Storage cleared" })
})

app.post(
  `/download`,
  multer({ storage }).single("package-file"),
  (req, res) => {
    const WaitTime = 1800

    res.setTimeout(WaitTime * 1000, () => {
      console.log(`waiting ${WaitTime} seconds, timeout`)
    })

    const inputType = req.body["input-type"] as InputType

    if (inputType === "squash") {
      const patch_name = generateOldPackagesPatch({ patchDir: tmpDir })
      console.log(`begin to download ${patch_name}`)
      res.download(patch_name)
      console.log(`finish download ${patch_name}`)
      return
    } else {
      res.json({ error: "Invalid input type" })
      return
    }
  }
)

const server = app.listen(PORT, () => {
  console.log(`Server ready at: http://localhost:${PORT}`)
})

process.on("SIGTERM", () => {
  server.close()
})
