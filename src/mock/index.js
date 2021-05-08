import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAPI = new MockAdapter(axios, { delayResponse: 2000 });
mockAPI.onPost('/register').reply(201);
