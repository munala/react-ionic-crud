/**
This adds the base url and Authorization header to reqeusts
*/
import axios from 'axios';
import { Plugins } from '@capacitor/core';
import { RequestArgumentInterface } from '../typescript/interfaces';

const { Storage } = Plugins;

const baseURL = 'https://reqres.in/api/';

export default async (params: RequestArgumentInterface) => {
  const { value: token } = await Storage.get({ key: 'token' });

  const instance = axios.create({
    baseURL,
  });

  instance.defaults.headers.common.Authorization = token;

  const {
    method, path, data, errorHandler,
  } = params;

  try {
    // @ts-ignore: No defined types for axios methods
    return instance[method](path, data);
  } catch (error) {
    let errorMessage;
    if (error.response) {
      errorMessage = error.response?.data?.message;
    } else if (error.request) {
      errorMessage = 'Connection problem';
    } else {
      errorMessage = 'Something went wrong';
    }

    return errorHandler(errorMessage);
  }
};
