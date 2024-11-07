import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../store/bookmarkSlice";
import { RootState } from "../store";

interface BookmarkButtonProps {
  image: any;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ image }) => {
    const dispatch = useDispatch();
    const bookmarks = useSelector((state: RootState) => state.bookmark.bookmarks);
    
    const isBookmarked = bookmarks.some((item) => item.id === image.id)

    const toogleBookmark = () => {
      if (isBookmarked) {
        dispatch(removeBookmark(image));
      } else {
        dispatch(addBookmark(image));
      }
    };

    return (
        <TouchableOpacity onPress={toogleBookmark} style={styles.bookmarkButton}>
            <Icon
              name= {isBookmarked ? 'bookmark' : 'bookmark-o'}
              size= {24}
              color= {isBookmarked? '#3E4685' : '#ccc'}
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