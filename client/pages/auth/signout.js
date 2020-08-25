import { useEffect } from 'react';
import { useRequest } from '../../hooks/use-request';
import Router from 'next/router';

export const Signout = () => {
  const { doRequest, errors } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...{errors}</div>;
};

export default Signout;
