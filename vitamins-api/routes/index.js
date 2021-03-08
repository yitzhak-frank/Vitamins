const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => res.json({massage: 'indes work'}));

module.exports = router;