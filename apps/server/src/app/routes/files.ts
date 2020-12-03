import { Request, Response, Router } from "express"
import security from "../lib/security"
import FilesService from "../services/files"

const router = Router()

router
  .get(
    "/v1/files",
    security.checkUserScope.bind(this, security.scope.READ_FILES),
    getFiles.bind(this)
  )
  .post(
    "/v1/files",
    security.checkUserScope.bind(this, security.scope.WRITE_FILES),
    uploadFile.bind(this)
  )
  .delete(
    "/v1/files/:file",
    security.checkUserScope.bind(this, security.scope.WRITE_FILES),
    deleteFile.bind(this)
  )

function getFiles(req: Request, res: Response, next) {
  FilesService.getFiles()
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

function uploadFile(req: Request, res: Response, next) {
  FilesService.uploadFile(req, res)
}

function deleteFile(req, res, next) {
  FilesService.deleteFile(req.params.file)
    .then(() => {
      res.end()
    })
    .catch(next)
}

export default router
