const express = require('express');
const router  = express.Router();




const bannerController = require('../controllers/banner.controller');

router.get('/banner', bannerController.getAllBanner);
router.post("/banner",bannerController.uploadMultiple,bannerController.newBanner);
router.put('/banner',bannerController.updateBanner);
router.get('/banner/:name',bannerController.getOneBanner);
router.delete('/banner/:name',bannerController.deleteOneBanner);

module.exports = router;