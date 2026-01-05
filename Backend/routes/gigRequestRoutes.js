const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const gigRequestController = require('../controllers/gigRequestController');

router.post('/', auth, gigRequestController.createRequest);
router.get('/provider', auth, gigRequestController.getProviderRequests);
router.get('/requester', auth, gigRequestController.getRequesterRequests);
router.put('/:id/status', auth, gigRequestController.updateRequestStatus);

module.exports = router;
