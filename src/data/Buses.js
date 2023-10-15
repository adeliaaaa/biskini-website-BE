exports.Buses = [
  {
    id: 'TMBK1',
    name: 'TMB K1',
    origin: 'Cibiru',
    destination: 'Cicaheum',
    minPrice: '14000',
    maxPrice: '22000',
    durationBetween: 10,
    schedules: [
      {
        departureTime: 510,
        seatAvailable: [3, 6, 8, 12, 14, 17, 19, 21, 23, 25, 27, 29],
        price: 14000,
      },
      {
        departureTime: 600,
        seatAvailable: [2, 5, 7, 9, 11, 13, 16, 18, 20, 22, 24, 26],
        price: 16000,
      },
      {
        departureTime: 750,
        seatAvailable: [2, 5, 7, 9, 11, 13, 16, 18, 20, 22, 24, 26],
        price: 20000,
      },
      {
        departureTime: 840,
        seatAvailable: [2, 5, 7, 9, 11, 13, 16, 18, 20, 22, 24, 26],
        price: 18000,
      },
      {
        departureTime: 990,
        seatAvailable: [2, 5, 7, 9, 11, 13, 16, 18, 20, 22, 24, 26],
        price: 22000,
      },
      {
        departureTime: 1080,
        seatAvailable: [1, 4, 7, 10, 13, 16, 18, 20, 22, 24, 27],
        price: 24000,
      },
    ],
    routes: [
      {
        location: 'Metro Indah Bandung Hotel, Jalan Soekarno Hatta, Sekejati, Bandung City, West Java',
        name: 'Hotel Metro',
        stopover: true,
      },
      {
        location: 'Grand Pasundan Convention Hotel, Jalan Peta, Suka Asih, Bandung City, West Java',
        name: 'Grand Pasundan Convention Hotel',
        stopover: true,
      },
      {
        location: 'Komplek Bumi Kopo Kencana, Jalan Papan Kencana III, Suka Asih, Bandung City, West Java',
        name: 'Komplek Bumi Kopo Kencana',
        stopover: true,
      },
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
      {
        location: 'Pasar Caringin, Babakan Ciparay, Bandung City, West Java',
        name: 'Pasar Caringin',
        stopover: true,
      },
    ],
  },
];
