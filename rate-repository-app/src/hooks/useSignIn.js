import { useMutation, gql, useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });

  const accessToken = response?.data?.authenticate?.accessToken;

    if (accessToken) {
      await authStorage.setAccessToken(accessToken);
      await apolloClient.resetStore(); // 
    }

    return response;
  };

  return [signIn, result];
};


export default useSignIn;
