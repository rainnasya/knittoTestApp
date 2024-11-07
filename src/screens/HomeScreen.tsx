import React, { useState, useLayoutEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator  } from "react-native";
import { useGetImagesQuery } from "../store/api/pixabayApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { clearToken } from "../store/authSlice";
import Icon from "react-native-vector-icons/FontAwesome";
import SearchComponent from "../components/SearchComponent";
import BookmarkButton from "../components/BookmarkButton";

const HomeScreen  = ({navigation} : any) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);

    if (!token) {
        navigation.navigate("Login");
    }
    
    const { data, error, isLoading, isFetching } = useGetImagesQuery({ searchTerm, page });

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleLogout = () =>{
        dispatch(clearToken());
        navigation.replace('Login');
    }

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Icon
              name="sign-out"
              size={25}
              color="#565D94"
              style={{ marginRight: 16 }}
              onPress={handleLogout}
            />
          )
        });
      }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pixabay Images</Text>

            <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {isLoading || isFetching ? (
                 <View style={styles.loadingContainer}>
                 <ActivityIndicator size="large" color="#007bff" />
               </View>
            ) : error ? (
                <Text>Error: {JSON.stringify(error)}</Text>
            ) : (
                <FlatList
                    data={data?.hits}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item.webformatURL }} style={styles.image} />
                            <Text style={styles.text}>{item.user}</Text>
                            <Text>{item.tags}</Text>
                            <BookmarkButton image={item}/>
                        </View>
                    )}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                />
            )}

        </View>
    );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EEF2FB',
      padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#565D94',
        marginVertical: 8,
        fontFamily: 'Roboto',
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    imageContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        marginBottom: 16,
        shadowColor: '#dbdbdb',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        resizeMode: 'cover',
        marginBottom: 10,
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      },
  });

export default HomeScreen; 