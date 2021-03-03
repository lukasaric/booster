const vehicleApi = require('@/api/vehicle').default;

jest.mock('@/api/request', () => {
  const item = { id: 1, make: 'AUDI', model: 'A3', year: 2010 };
  const items = [
    item,
    { id: 2, make: 'ACURA', model: 'X1', year: 2000 },
    { id: 3, make: 'HONDA', model: 'X2', year: 2005 }
  ];
  return {
    get: jest.fn().mockResolvedValue({ data: { data: { items } } }),
    post: jest.fn().mockResolvedValue({ data: { data: { item } } })
  };
});

describe('Test Vehicle API', () => {
  it('should fetch vehicles properly', async () => {
    const params = {};
    const vehicles = await vehicleApi.fetch(params);
    expect(vehicles).toBeTruthy();
  });

  it('should create vehicle', async () => {
    const payload = { make: 'AUDI', model: 'A3', year: 2010 };
    const vehicle = await vehicleApi.create(payload);
    expect(vehicle).toBeTruthy();
  });
});
