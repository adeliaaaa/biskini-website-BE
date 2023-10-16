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
    const { reversed } = req.query;
    const bus = { ...Buses.find((b) => b.id === busId) };

    if (bus === undefined) {
      res.status(204);
      res.json({});

      return next();
    }

    if (reversed) {
      const { origin, destination } = bus;
      bus.origin = destination;
      bus.destination = origin;

      bus.routes = bus.routes.reverse();
    }

    for (let i = 0; i < bus.routes.length; i++) {
      bus.routes[i].arrivalTime = bus.schedules[0].departureTime + i * bus.durationBetween;
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
    } = req.body;
    if (
      id === undefined
      || agencyId === undefined
      || name === undefined
    ) {
      res.status(400);
      res.send('Bus ID, Agency ID, and Name must be filled');

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

    const origin = 'Cibiru';
    const destination = 'Cicaheum';
    const durationBetween = 10;
    const schedules = [
      {
        departureTime: 510,
        seatAvailable: [3, 19, 21, 23, 25, 27, 29],
        price: 14000,
      },
      {
        departureTime: 600,
        seatAvailable: [2, 13, 16, 18, 24, 26],
        price: 16000,
      },
    ];
    const routes = [
      {
        location: 'Mall Festival Citylink, Jalan Peta, Suka Asih, Bandung City, West Java',
        name: 'Mall Festival Citylink',
        stopover: true,
      },
      {
        location: 'Bandung Train Station, Jalan Kebon Kawung, Babakan Ciamis, Bandung City, West Java',
        name: 'Bandung Train Station',
        stopover: true,
      },
      {
        location: 'Alun-Alun Bandung, Jalan Asia Afrika, Braga, Bandung City, West Java',
        name: 'Alun-Alun Bandung',
        stopover: true,
      },
    ];

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
      agencyId,
    } = req.body;
    if (
      busId === undefined
      || name === undefined
      || agencyId === undefined
    ) {
      res.status(400);
      res.send('Bus ID, Agency ID, and Name must be filled');

      return next();
    }

    const busIdx = Buses.findIndex((a) => a.id === busId);

    if (busIdx === -1) {
      res.status(404);
      res.send('Bus not found');

      return next();
    }

    const agencyIdx = Agencies.findIndex((a) => a.id === agencyId);

    if (agencyIdx === -1) {
      res.status(400);
      res.send('Agency not found');

      return next();
    }

    Buses[busIdx].name = name;
    Buses[busIdx].agencyId = agencyId;

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

// Bus Booking
// Stop Overs CRUD
exports.getStopOvers = async (req, res, next) => {
  try {
    const { stopOver } = req.params;
    let stopOvers = [...new Set(Buses.map((bus) => {
      if (stopOver) {
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

exports.getBusBooks = async (req, res, next) => {
  try {
    const {
      origin,
      destination,
    } = req.query;
    if (
      origin === undefined
      || destination === undefined
    ) {
      res.status(400);
      res.send('Origin and Destination must be filled');

      return next();
    }

    const buses = [...Buses.filter((b) => (
      b.routes.findIndex((route) => route.name === origin) !== -1
      && b.routes.findIndex((route) => route.name === destination) !== -1
    ))];

    buses.forEach((bus) => {
      const originIdx = bus.routes.findIndex((route) => route.name === origin);
      const destinationIdx = bus.routes.findIndex((route) => route.name === destination);
      /* eslint-disable no-param-reassign */
      if (originIdx > destinationIdx) {
        bus.routes = bus.routes.slice(destinationIdx, originIdx + 1);

        // eslint-disable-next-line max-len
        bus.schedules.forEach((schedule) => {
          schedule.departureTime += destinationIdx * bus.durationBetween;
        });

        const temp = bus.origin;
        bus.origin = bus.destination;
        bus.destination = temp;
        bus.routes = bus.routes.reverse();
      } else {
        // eslint-disable-next-line max-len
        bus.schedules.forEach((schedule) => {
          schedule.departureTime += originIdx * bus.durationBetween;
        });
        bus.routes = bus.routes.slice(originIdx, destinationIdx + 1);
      }
      /* eslint-enable no-param-reassign */
    });

    res.status(200);
    res.json(buses.map((bus) => ({
      id: bus.id,
      agencyId: bus.agencyId,
      name: bus.name,
      origin: bus.origin,
      destination: bus.destination,
      departureTime: bus.schedules[0].departureTime,
    })));

    return next();
  } catch (err) {
    return next(err);
  }
};

exports.getBusBookById = async (req, res, next) => {
  try {
    const { busId } = req.params;
    const {
      origin,
      destination,
    } = req.query;
    if (
      busId === undefined
      || origin === undefined
      || destination === undefined
    ) {
      res.status(400);
      res.send('Bus ID, Origin, and Destination must be filled');

      return next();
    }

    const bus = { ...Buses.find((b) => b.id === busId) };

    const originIdx = bus.routes.findIndex((route) => route.name === origin);
    const destinationIdx = bus.routes.findIndex((route) => route.name === destination);

    /* eslint-disable no-param-reassign */
    if (originIdx > destinationIdx) {
      bus.routes = bus.routes.slice(destinationIdx, originIdx + 1);

      bus.schedules.forEach((schedule) => {
        schedule.departureTime += destinationIdx * bus.durationBetween;
      });
      bus.routes.forEach((route) => {
        route.arrivalTime = bus.schedules[0].departureTime + originIdx * bus.durationBetween;
      });

      const temp = bus.origin;
      bus.origin = bus.destination;
      bus.destination = temp;
      bus.routes = bus.routes.reverse();
    } else {
      // eslint-disable-next-line max-len
      bus.schedules.forEach((schedule) => {
        schedule.departureTime += originIdx * bus.durationBetween;
      });
      bus.routes.forEach((route) => {
        route.arrivalTime = bus.schedules[0].departureTime + originIdx * bus.durationBetween;
      });
      bus.routes = bus.routes.slice(originIdx, destinationIdx + 1);
    }

    const duration = bus.routes[bus.routes.length - 1].arrivalTime - bus.routes[0].arrivalTime;

    res.status(200);
    res.json({
      id: bus.id,
      name: bus.name,
      origin: bus.origin,
      destination: bus.destination,
      duration,
      minPrice: bus.minPrice,
      maxPrice: bus.maxPrice,
      scheduleTimes: bus.schedules.map((schedule) => schedule.departureTime),
      routes: bus.routes,
    });

    return next();
  } catch (err) {
    return next(err);
  }
};

exports.getBusBookSchedules = async (req, res, next) => {
  try {
    const { busId } = req.params;
    const {
      origin,
      destination,
      numOfPeople,
    } = req.query;

    const bus = { ...Buses.find((b) => b.id === busId) };
    bus.schedules = bus.schedules.filter((s) => s.seatAvailable.length > numOfPeople);

    const originIdx = bus.routes.findIndex((route) => route.name === origin);
    const destinationIdx = bus.routes.findIndex((route) => route.name === destination);

    /* eslint-disable no-param-reassign */
    if (originIdx > destinationIdx) {
      bus.routes = bus.routes.slice(destinationIdx, originIdx + 1);

      // eslint-disable-next-line max-len
      bus.schedules.forEach((schedule) => {
        schedule.departureTime += destinationIdx * bus.durationBetween;
      });

      if (bus.schedules.length !== 0) {
        bus.routes.forEach((route) => {
          route.arrivalTime = bus.schedules[0].departureTime + destinationIdx * bus.durationBetween;
        });
      }

      const temp = bus.origin;
      bus.origin = bus.destination;
      bus.destination = temp;
      bus.routes = bus.routes.reverse();
    } else {
      // eslint-disable-next-line max-len
      bus.schedules.forEach((schedule) => {
        schedule.departureTime += originIdx * bus.durationBetween;
      });
      if (bus.schedules.length !== 0) {
        bus.routes.forEach((route) => {
          route.arrivalTime = bus.schedules[0].departureTime + originIdx * bus.durationBetween;
        });
      }
      bus.routes = bus.routes.slice(originIdx, destinationIdx + 1);
    }

    const duration = bus.routes[bus.routes.length - 1].arrivalTime - bus.routes[0].arrivalTime;

    res.status(200);
    res.json({
      id: bus.id,
      name: bus.name,
      origin: bus.origin,
      destination: bus.destination,
      schedules: bus.schedules.map((schedule) => ({
        departureTime: schedule.departureTime,
        arrivalTime: schedule.departureTime + duration,
        price: schedule.price,
        seatAvailable: schedule.seatAvailable.length,
      })),
      routes: bus.routes,
    });

    return next();
  } catch (err) {
    return next(err);
  }
};

exports.getBusBookAvailableSeat = async (req, res, next) => {
  try {
    const { busId } = req.params;
    const {
      origin,
      destination,
      departureTime,
      numOfPeople,
    } = req.query;

    const bus = { ...Buses.find((b) => b.id === busId) };

    const originIdx = bus.routes.findIndex((route) => route.name === origin);
    const destinationIdx = bus.routes.findIndex((route) => route.name === destination);

    let scheduleIdx = 0;

    /* eslint-disable no-param-reassign */
    if (originIdx > destinationIdx) {
      bus.routes = bus.routes.slice(destinationIdx, originIdx + 1);

      // eslint-disable-next-line max-len
      bus.schedules.forEach((schedule) => schedule.departureTime + destinationIdx * bus.durationBetween);
      // eslint-disable-next-line max-len
      scheduleIdx = bus.schedules.findIndex((schedule) => parseInt(schedule.departureTime, 10) === parseInt(departureTime, 10));
    } else {
      // eslint-disable-next-line max-len
      bus.schedules.forEach((schedule) => schedule.departureTime + destinationIdx * bus.durationBetween);
      // eslint-disable-next-line max-len
      scheduleIdx = bus.schedules.findIndex((schedule) => parseInt(schedule.departureTime, 10) === parseInt(departureTime, 10));
    }

    res.status(200);
    res.json({
      ...bus,
      departureTime: bus.schedules[scheduleIdx].departureTime,
      totalPrice: bus.schedules[scheduleIdx].price * numOfPeople,
      seatAvailable: bus.schedules[scheduleIdx].seatAvailable,
    });

    return next();
  } catch (err) {
    return next(err);
  }
};
