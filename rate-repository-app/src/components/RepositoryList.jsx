import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});



const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [repositories, setRepositories] = useState(null);

  const fetchRepositories = async () => {
    try {
      // Replace the IP address with your local server's IP
      const response = await fetch('http://127.0.0.1:5000/api/repositories');
      const json = await response.json();
      console.log(json);
      setRepositories(json);
    } catch (error) {
      console.error('Failed to fetch repositories:', error);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  // Safely extract repository nodes
  const repositoryNodes = repositories?.edges?.map(edge => edge.node) || [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;