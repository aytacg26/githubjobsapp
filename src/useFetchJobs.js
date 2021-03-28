import { useEffect, useReducer } from 'react';
import axios from 'axios';

const ACTIONS = {
  MAKE_REQUEST: 'MAKE_REQUEST',
  GET_DATA: 'GET_DATA',
  ERROR: 'ERROR',
  UPDATE_HAS_NEXT_PAGE: 'UPDATE_HAS_NEXT_PAGE',
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

    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: payload };

    default:
      return state;
  }
};

const getJobs = async (page, params, dispatch, axToken) => {
  try {
    console.log(page);
    const res = await axios.get(BASE_URL, {
      cancelToken: axToken.token,
      params: { markdown: true, page: page, ...params },
    });

    const jobs = await res.data;

    dispatch({ type: ACTIONS.GET_DATA, payload: jobs });
  } catch (error) {
    if (axios.isCancel(error)) return;

    dispatch({ type: ACTIONS.ERROR, payload: error });
  }
};

const getNextPage = async (page, params, dispatch, axToken) => {
  try {
    const res = await axios.get(BASE_URL, {
      cancelToken: axToken.token,
      params: { markdown: true, page: page + 1, ...params },
    });

    const jobs = await res.data;
    const hasNextPage = jobs && jobs?.length > 0;

    dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: hasNextPage });
  } catch (error) {
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
    const cancelToken1 = axios.CancelToken.source();
    const cancelToken2 = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    getJobs(page, params, dispatch, cancelToken1);
    getNextPage(page, params, dispatch, cancelToken2);

    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);

  return state;
};

export default useFetchJobs;
