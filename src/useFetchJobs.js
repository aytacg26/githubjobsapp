import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const ACTIONS = {
  MAKE_REQUEST: 'MAKE_REQUEST',
  GET_DATA: 'GET_DATA',
  ERROR: 'ERROR',
};

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
        jobs: payload.jobs,
      };
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: payload.error, jobs: [] };
    default:
      return state;
  }
};

const useFetchJobs = (params, page) => {
  const [state, dispatch] = useReducer(reducer, {
    jobs: [],
    loading: true,
    error: false,
  });

  return {
    jobs: [],
    loading: false,
    error: false,
  };
};

export default useFetchJobs;
