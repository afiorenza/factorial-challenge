import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAdapter = new MockAdapter(axios);

mockAdapter
  .onGet('/types')
  .reply(200, {
    data: ['TEMPERATURE', 'HUMIDITY']
  });

export default mockAdapter;
