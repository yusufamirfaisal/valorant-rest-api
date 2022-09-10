const router = require('express').Router();

const member = require('../../controllers/members');

router.get('/', member.findAll);
router.get('/:id', member.findByPk);
router.post('/', member.create);
router.patch('/:id', member.update);
router.delete('/:id', member.destroy);

module.exports = router;