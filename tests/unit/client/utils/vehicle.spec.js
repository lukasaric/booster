const api = require('@/api/vehicle').default;

const mockApiHelper = apiMethod => jest.mock('@/api/vehicle', () => () => ({ api: apiMethod }));

describe('Test Vehicle API', () => {
  it('should fetch vehicles properly', async () => {
    const items = [
      { id: 1, make: 'AUDI', model: 'A3', make: 2010 },
      { id: 2, make: 'ACURA', model: 'X1', make: 2000 },
      { id: 3, make: 'HONDA', model: 'X2', make: 2005 }
    ];
    mockApiHelper({ fetch: () => Promise.resolve({ items }) });
    // expect(api).toHaveBeenCalledTimes(1)
  });

  it('should softly remove vehicle', async () => {
    mockApiHelper({ fetch: () => Promise.resolve() })
    // expect(api).toHaveBeenCalledTimes(1)
  });
});
