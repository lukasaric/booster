import { extractData, processParams } from '@/api/helpers';

describe('Test API helpers', () => {
  it('should extract nested data from response', () => {
    const mockedResponse = {
      data: {
        data: { extracted: true }
      }
    };
    const { extracted } = extractData(mockedResponse);
    expect(extracted).toEqual(true);
  });

  it('should process fetch params properly', () => {
    const mockedParams = {
      itemsPerPage: 30,
      page: 1,
      sortBy: 'make',
      sortDesc: false,
      params: { fuzzyResult: null, archived: false }
    };

    const params = processParams(mockedParams);
    const { limit, fuzzyResult, archived, sortBy, sortOrder, offset } = params;

    expect(limit).toEqual(mockedParams.itemsPerPage);
    expect(fuzzyResult).toEqual(mockedParams.params.fuzzyResult);
    expect(archived).toEqual(mockedParams.params.archived);
    expect(sortBy).toEqual(mockedParams.sortBy);
    expect(sortOrder).toEqual(params.sortDesc ? 'DESC' : 'ASC');
    expect(offset).toEqual((mockedParams.page - 1) * limit);
  });
});
