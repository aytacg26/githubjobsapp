import { useState } from 'react';
import './App.css';
import useFetchJobs from './useFetchJobs';
import { Container } from 'react-bootstrap';
import Job from './Job';
import Loader from './Loader';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';

const App = () => {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  const handleParamChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  };

  return (
    <Container className='my-5'>
      <h1>GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      {!loading && (
        <JobsPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
      )}
      {loading && <Loader />}
      {error && <h1>Error. Try Refreshing...</h1>}
      {!loading && !error && jobs.map((job) => <Job key={job.id} job={job} />)}
      {!loading && (
        <JobsPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
      )}
    </Container>
  );
};

export default App;
