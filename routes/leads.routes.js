const express = require('express');
const router = express.Router();
const { getLeads, getLead, postLead } = require('../controllers/leads.controller.js');

router.get('/', getLeads);
router.get('/:id', getLead);
router.post('/', postLead);

module.exports = router;