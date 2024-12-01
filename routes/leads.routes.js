const express = require('express');
const router = express.Router();
const { getLeads, getLead, postLead, deleteLead, updateLead } = require('../controllers/leads.controller.js');

router.get('/', getLeads);
router.get('/:id', getLead);
router.post('/', postLead);
router.delete('/:id', deleteLead);
router.patch('/:id', updateLead);

module.exports = router;