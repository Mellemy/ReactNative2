import { gql, useMutation } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`;

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const { data } = await mutate({ variables: { user: { username, password } } });
    return data;
  };

  return [signUp, result];
};

export default useSignUp;
