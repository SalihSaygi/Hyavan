import React from 'react';
import { useQuery } from 'react-query';
import { login } from '@modules/auth/github';
import User from './userDetails';

const Authorize = () => {
  // Queries
  const { isLoading, isError, data, error } = useQuery('login', login);
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log(data);

  return (
    <div>
      <User user={data} />
    </div>
  );
};

export default Authorize;
