import { gql, useMutation } from '@apollo/client';

const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async (review) => {
    const { data } = await mutate({ variables: { review } });
    return data;
  };

  return [createReview, result];
};

export default useCreateReview;
