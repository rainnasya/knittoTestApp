import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BookmarkButtonProps {
  image: any;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ image }) => {
    const [bookmarks, setBookmarks] = useState<any[]>([]);

    useEffect(() => {
        const loadBookmarks = async () => {
            try {
                const storedBookmarks = await AsyncStorage.getItem('bookmarks');
                if (storedBookmarks) {
                    setBookmarks(JSON.parse(storedBookmarks));
                }
            } catch (error) {
                console.error('Error loading bookmarks', error);
            }
        };
        loadBookmarks();
    }, []);

    const isBookmarked = bookmarks.some((item) => item.id === image.id);

    const toggleBookmark = async () => {
        let updatedBookmarks = [...bookmarks];
        
        if (isBookmarked) {
            updatedBookmarks = updatedBookmarks.filter(item => item.id !== image.id);
        } else {
            updatedBookmarks.push(image);
        }
        try {
            await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            setBookmarks(updatedBookmarks);
        } catch (error) {
            console.error('Error saving bookmark', error);
        }
    };

    return (
        <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkButton}>
            <Icon
              name={isBookmarked ? 'bookmark' : 'bookmark-o'}
              size={24}
              color={isBookmarked ? '#3E4685' : '#ccc'}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  bookmarkButton: {
    position: 'absolute',
    bottom: 10, 
    right: 10, 
    padding: 8,
  },
});

export default BookmarkButton;
