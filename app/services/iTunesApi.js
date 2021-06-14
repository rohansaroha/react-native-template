import { generateApiClient } from 'app/utils/apiUtils';

const itunesApi = generateApiClient('itunes');
export const getSongs = songName => itunesApi.get(`/search?term=${songName}`);
