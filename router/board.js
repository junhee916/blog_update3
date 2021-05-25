const express = require('express')

const multer = require('multer')
const checkAuth = require('../middleware/check-auth')
const {
    boards_get_board,
    boards_get_all,
    boards_delete_board,
    boards_patch_board,
    boards_post_board,
    boards_delete_all
} = require('../controller/board')
const router = express.Router()

const storage = multer.diskStorage(
    {
        destination : function(req, file, cb){
            cb(null, './uploads')
        },
        filename : function(req, file, cb){
            cb(null, file.originalname)
        }
    }
)

const fileFilter = (req, file, cb) => {

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }
    else{
        cb(null, false)
    }
}

const upload = multer(
    {
        storage : storage,
        limit : {
            filesize : 1024*1024*5
        },
        fileFilter : fileFilter
    }
)

// total get board
router.get('/', boards_get_all)

// detail get board
router.get('/:boardId', checkAuth, boards_get_board)

// register board
router.post('/', checkAuth, upload.single('boardImage'), boards_post_board)

// update board
router.patch('/:boardId', checkAuth, boards_patch_board)

// detail delete board
router.delete('/:boardId', checkAuth, boards_delete_board)

// total delete board
router.delete('/', boards_delete_all)

module.exports = router