import { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Menu, Button, Provider as PaperProvider } from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  menuContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    },

   sortButtonLabel: {
    fontSize: 15,
    color: '#f9a60dff', 
    fontWeight: 'bold',
  },
});



const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ selectedSort, setSelectedSort }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (option) => {
    setSelectedSort(option);
    closeMenu();
  };

  return (
    <View style={styles.menuContainer}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
        <Button
            onPress={openMenu}
            labelStyle={styles.sortButtonLabel}

          >
         Sort by
        </Button>
        }
      >
        <Menu.Item onPress={() => handleSelect('latest')} title="Latest repositories" />
        <Menu.Item onPress={() => handleSelect('highest')} title="Highest rated repositories" />
        <Menu.Item onPress={() => handleSelect('lowest')} title="Lowest rated repositories" />
      </Menu>
    </View>
  );
};

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState('latest');

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

  const { repositories } = useRepositories(sortVariables);
  const navigate = useNavigate();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
     <PaperProvider>
     <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <RepositoryListHeader
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        }
        renderItem={({ item }) => (
          <RepositoryItem
            item={item}
            onPress={() => navigate(`/repository/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </PaperProvider>
  );
};

export default RepositoryList;