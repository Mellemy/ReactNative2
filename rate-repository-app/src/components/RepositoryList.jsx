import { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});



const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
const { repositories } = useRepositories();
 const navigate = useNavigate();

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
        <RepositoryItem
          item={item}
          onPress={() => navigate(`/repository/${item.id}`)}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;