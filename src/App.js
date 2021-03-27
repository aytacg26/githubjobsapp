import { useState } from 'react';
import './App.css';
import useFetchJobs from './useFetchJobs';
import { Container } from 'react-bootstrap';
import Job from './Job';
import Loader from './Loader';
import JobsPagination from './JobsPagination';

const App = () => {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  let { jobs, loading, error } = useFetchJobs();

  return (
    <Container className='my-5'>
      <h1>GitHub Jobs</h1>
      <JobsPagination page={page} setPage={setPage} />
      {loading && <Loader />}
      {error && <h1>Error. Try Refreshing...</h1>}
      {!loading && !error && jobs.map((job) => <Job key={job.id} job={job} />)}
      <JobsPagination page={page} setPage={setPage} />
    </Container>
  );
};

export default App;
