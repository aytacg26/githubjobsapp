import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const ACTIONS = {
  MAKE_REQUEST: 'MAKE_REQUEST',
  GET_DATA: 'GET_DATA',
  ERROR: 'ERROR',
};

const BASE_URL =
  'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.MAKE_REQUEST:
      return {
        loading: true,
        jobs: [],
      };
    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
        jobs: payload,
      };
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: payload, jobs: [] };
    default:
      return state;
  }
};

const getJobs = async (page, params, dispatch, axToken) => {
  try {
    const res = await axios.get(BASE_URL, {
      cancelToken: axToken.token,
      params: { markdown: true, page: page, ...params },
    });

    const jobs = await res.data;

    dispatch({ type: ACTIONS.GET_DATA, payload: jobs });
  } catch (error) {
    console.log(axios.isCancel(error));
    console.log(error);
    if (axios.isCancel(error)) return;

    dispatch({ type: ACTIONS.ERROR, payload: error });
  }
};

const useFetchJobs = (params, page) => {
  const [state, dispatch] = useReducer(reducer, {
    jobs: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    getJobs(page, params, dispatch, cancelToken);

    return () => {
      cancelToken.cancel();
    };
  }, [params, page]);

  return state;
};

export default useFetchJobs;
