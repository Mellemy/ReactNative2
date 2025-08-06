import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import { Provider as PaperProvider } from 'react-native-paper';
import { RepositoryListContainer } from './RepositoryListContainer';

const RepositoryList = () => {
  const navigate = useNavigate();

  const [selectedSort, setSelectedSort] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const getSortVariables = () => {
    switch (selectedSort) {
      case 'highest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      case 'lowest':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      case 'latest':
      default:
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    }
  };

  const sortVariables = getSortVariables();

  const { repositories } = useRepositories({
    ...sortVariables,
    searchKeyword: debouncedSearchKeyword,
  });

  const handleRepositoryPress = (id) => {
    navigate(`/repository/${id}`);
  };

 return (
    <PaperProvider>
      <RepositoryListContainer
        repositories={repositories}
        onSortChange={setSelectedSort}
        onSearchChange={setSearchKeyword}
        onRepositoryPress={handleRepositoryPress}
      />
    </PaperProvider>
  );
};

export default RepositoryList;