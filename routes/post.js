var express=require('express'),
router=express.Router(),
PostController=require('../controllers/PostController');
router.post('/',PostController.create);
router.get('/',PostController.getAll);
router.get('/:id',PostController.get);
router.put('/:id',PostController.update);
router.delete('/:id',PostController.delete);
module.exports=router;
