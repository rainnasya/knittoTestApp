import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface SearchComponentProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ searchTerm, setSearchTerm }) => {
    return (
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchTerm}
        onChangeText={setSearchTerm} 
      />
    );
  };
  
  const styles = StyleSheet.create({
    searchInput: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 12,
      paddingLeft: 8,
      borderRadius: 50,
      width: '100%',
    },
  });
  
  export default SearchComponent;