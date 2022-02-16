// traemos a express
const express = require('express');

const router = express.Router();

router.get('/categories/:catId/products/:prodId', (request, response) => {
  const { catId, prodId } = request.params;
  response.json({
    catId,
    prodId,
  });
});

module.exports = router;
