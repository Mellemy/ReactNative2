import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { Searchbar, Menu, Button } from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    backgroundColor: '#c08fa6ff', 
  },
  menuContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchbar: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    margin: 10,
    borderWidth: 1.5,
  },
  sortButtonLabel: {
    fontSize: 17,
    color: '#f9a60dff',
    fontWeight: 'bold',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  state = {
    sortOption: 'latest',
    menuVisible: false,
    searchKeyword: '',
  };

  openMenu = () => this.setState({ menuVisible: true });
  closeMenu = () => this.setState({ menuVisible: false });

  handleSortSelect = (option) => {
    this.setState({ sortOption: option });
    this.closeMenu();
    this.props.onSortChange(option);
  };

  handleSearchChange = (query) => {
    this.setState({ searchKeyword: query });
    this.props.onSearchChange(query);
  };

  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Searchbar
          placeholder="Search repositories"
          value={this.state.searchKeyword}
          onChangeText={this.handleSearchChange}
          style={styles.searchbar}
        />

        <View style={styles.menuContainer}>
          <Menu
            visible={this.state.menuVisible}
            onDismiss={this.closeMenu}
            anchor={
              <Button
                onPress={this.openMenu}
                labelStyle={styles.sortButtonLabel}
              >
                Sort by
              </Button>
            }
          >
            <Menu.Item onPress={() => this.handleSortSelect('latest')} title="Latest repositories" />
            <Menu.Item onPress={() => this.handleSortSelect('highest')} title="Highest rated repositories" />
            <Menu.Item onPress={() => this.handleSortSelect('lowest')} title="Lowest rated repositories" />
          </Menu>
        </View>
      </View>
    );
  };

  render() {
    const { repositories, onRepositoryPress } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <RepositoryItem item={item} onPress={() => onRepositoryPress(item.id)} />
        )}
        keyExtractor={(item) => item.id}
      />
    );
  }
}
