const RepairController = require('../controllers/repair');
const koaRouter = require('koa-router');
const models = require('../models');
const router = new koaRouter();
const RepairControl = new RepairController(models.shops);
router.post('/webhooks', RepairControl.webhooksRepair);
router.post('/reSync', RepairControl.reSync);
module.exports = router;
