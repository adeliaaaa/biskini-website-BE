const express = require('express');

const busController = require('../controllers/busController');

const router = express.Router();

// Agencies
router.get(
  '/agencies',
  busController.getAgencies,
);
router.get(
  '/agencies/:agencyId',
  busController.getAgencyById,
);
router.post(
  '/agencies',
  busController.postAgency,
);
router.put(
  '/agencies/:agencyId',
  busController.updateAgencyById,
);
router.delete(
  '/agencies/:agencyId',
  busController.deleteAgencyById,
);

router.get(
  '/buses',
  busController.getBuses,
);
router.get(
  '/buses/:busId',
  busController.getBusById,
);
router.post(
  '/buses',
  busController.postBus,
);
router.put(
  '/buses/:busId',
  busController.updateBusById,
);
router.delete(
  '/buses/:busId',
  busController.deleteBusById,
);

router.get(
  '/stopovers/:stopOver?',
  busController.getStopOvers,
);

module.exports = router;
