const { Agencies } = require('../data/Agencies');
const { Buses } = require('../data/Buses');

// Agency CRUD
exports.getAgencies = async (req, res, next) => {
  try {
    const agencies = Agencies;

    if (agencies === undefined) {
      res.status(204);
      res.json([]);

      return next();
    }

    res.status(200);
    res.json(agencies);

    return next();
  } catch (err) {
    return next(err);
  }
};

exports.getAgencyById = async (req, res, next) => {
  try {
    const { agencyId } = req.params;
    const agency = Agencies.find((a) => a.id === agencyId);

    if (agency === undefined) {
      res.status(204);
      res.json({});

      return next();
    }

    const buses = [];
    agency.buses.forEach((datum) => {
      const bus = Buses.find((b) => b.id === datum.id);
      if (bus !== undefined) {
        buses.push({
          id: bus.id,
          name: bus.name,
          origin: bus.origin,
          destination: bus.destination,
        });
      }
    });

    res.status(200);
    res.json({
      id: agency.id,
      name: agency.name,
      buses,
    });

    return next();
  } catch (err) {
    return next(err);
  }
};

exports.postAgency = async (req, res, next) => {
  try {
    const {
      id,
      name,
    } = req.body;
    if (id === undefined || name === undefined) {
      res.status(400);
      res.send('Agency ID and Name must be filled');

      return next();
    }

    const agency = Agencies.find((a) => a.id === id);

    if (agency !== undefined) {
      res.status(400);
      res.send('Agency ID must be unique');

      return next();
    }

    Agencies.push({
      id,
      name,
      buses: [],
    });

    res.status(200);
    res.send('Agency successfully created');

    return next();
  } catch (err) {
    return next(err);
  }
};

exports.updateAgencyById = async (req, res, next) => {
  try {
    const { agencyId } = req.params;
    const { name } = req.body;
    if (agencyId === undefined || name === undefined) {
      res.status(400);
      res.send('Agency ID and Name must be filled');

      return next();
    }

    const agencyIdx = Agencies.findIndex((a) => a.id === agencyId);

    if (agencyIdx === -1) {
      res.status(404);
      res.send('Agency not found');

      return next();
    }

    Agencies[agencyIdx].name = name;

    res.status(200);
    res.send('Agency successfully updated');

    return next();
  } catch (err) {
    return next(err);
  }
};

exports.deleteAgencyById = async (req, res, next) => {
  try {
    const { agencyId } = req.params;
    if (agencyId === undefined) {
      res.status(400);
      res.send('Agency ID must be filled');

      return next();
    }

    const agencyIdx = Agencies.findIndex((a) => a.id === agencyId);

    if (agencyIdx === -1) {
      res.status(404);
      res.send('Agency not found');

      return next();
    }

    Agencies.splice(agencyIdx, 1);

    res.status(200);
    res.send('Agency successfully deleted');

    return next();
  } catch (err) {
    return next(err);
  }
};

// Bus CRUD
exports.getBuses = async (req, res, next) => {
  try {
    const buses = Buses;

    if (buses === undefined) {
      res.status(204);
      res.json([]);

      return next();
    }

    res.status(200);
    res.json(buses);

    return next();
  } catch (err) {
    return next(err);
  }
};

exports.getBusById = async (req, res, next) => {
  try {
    const { busId } = req.params;
    const bus = Buses.find((b) => b.id === busId);

    if (bus === undefined) {
      res.status(204);
      res.json({});

      return next();
    }

    res.status(200);
    res.json(bus);

    return next();
  } catch (err) {
    return next(err);
  }
};

exports.postBus = async (req, res, next) => {
  try {
    const {
      id,
      agencyId,
      name,
      origin,
      destination,
      durationBetween,
      schedules,
      routes,
    } = req.body;
    if (
      id === undefined
      || agencyId === undefined
      || name === undefined
      || origin === undefined
      || destination === undefined
      || durationBetween === undefined
      || schedules === undefined
      || routes === undefined
    ) {
      res.status(400);
      res.send('Bus ID, Agency ID, Name, Origin, Destination, Duration Between, Schedules, and Routes must be filled');

      return next();
    }

    const agencyIdx = Agencies.findIndex((a) => a.id === agencyId);

    if (agencyIdx === -1) {
      res.status(400);
      res.send('Agency not found');

      return next();
    }

    const bus = Buses.find((a) => a.id === id);

    if (bus !== undefined) {
      res.status(400);
      res.send('Bus ID must be unique');

      return next();
    }

    Agencies[agencyIdx].buses.push({ id });

    Buses.push({
      id,
      name,
      origin,
      destination,
      minPrice: Math.min(...schedules.map((schedule) => schedule.price)),
      maxPrice: Math.max(...schedules.map((schedule) => schedule.price)),
      durationBetween,
      schedules,
      routes,
    });

    res.status(200);
    res.send('Bus successfully created');

    return next();
  } catch (err) {
    return next(err);
  }
};

exports.updateBusById = async (req, res, next) => {
  try {
    const { busId } = req.params;
    const {
      name,
      origin,
      destination,
      durationBetween,
      schedules,
      routes,
    } = req.body;
    if (
      busId === undefined
      || name === undefined
      || origin === undefined
      || destination === undefined
      || durationBetween === undefined
      || schedules === undefined
      || routes === undefined
    ) {
      res.status(400);
      res.send('Bus ID, Name, Origin, Destination, Duration Between, Schedules, and Routes must be filled');

      return next();
    }

    const busIdx = Buses.findIndex((a) => a.id === busId);

    if (busIdx === -1) {
      res.status(404);
      res.send('Bus not found');

      return next();
    }

    Buses[busIdx].name = name;
    Buses[busIdx].origin = origin;
    Buses[busIdx].destination = destination;
    Buses[busIdx].minPrice = Math.min(...schedules.map((schedule) => schedule.price));
    Buses[busIdx].maxPrice = Math.max(...schedules.map((schedule) => schedule.price));
    Buses[busIdx].durationBetween = durationBetween;
    Buses[busIdx].schedules = schedules;
    Buses[busIdx].routes = routes;

    res.status(200);
    res.send('Bus successfully updated');

    return next();
  } catch (err) {
    return next(err);
  }
};

exports.deleteBusById = async (req, res, next) => {
  try {
    const { busId } = req.params;
    if (busId === undefined) {
      res.status(400);
      res.send('Bus ID must be filled');

      return next();
    }

    const busIdx = Buses.findIndex((a) => a.id === busId);

    if (busIdx === -1) {
      res.status(404);
      res.send('Bus not found');

      return next();
    }

    Buses.splice(busIdx, 1);
    Agencies.forEach((agency) => {
      const idx = agency.buses.findIndex((bus) => bus.id === busIdx);
      agency.buses.splice(idx, 1);
    });

    res.status(200);
    res.send('Bus successfully deleted');

    return next();
  } catch (err) {
    return next(err);
  }
};

// Bus Schedule and Booking

// Stop Overs CRUD
exports.getStopOvers = async (req, res, next) => {
  try {
    const { stopOver } = req.params;
    let stopOvers = [...new Set(Buses.map((bus) => {
      if (stopOver) {
        console.log('INI');
        const idx = bus.routes.findIndex((r) => r.name === stopOver);

        if (idx === -1) {
          return [];
        }
      }

      return bus.routes.map((r) => r.name);
    }).flat())];

    if (stopOver) {
      stopOvers = stopOvers.filter((data) => data !== stopOver);
    }

    res.status(200);
    res.json(stopOvers);

    return next();
  } catch (err) {
    return next(err);
  }
};
