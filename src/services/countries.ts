import axios, { AxiosResponse } from "axios";
import { Country } from "src/types/Country";

export const getCountryList = (): Promise<AxiosResponse<Country[]>> => axios.get('https://api.sampleapis.com/countries/countries');

