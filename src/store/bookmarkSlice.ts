import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookmarkState {
  bookmarks: Array<any>; // Menyimpan gambar yang dibookmark
}

const initialState: BookmarkState = {
  bookmarks: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<any>) => {
      state.bookmarks.push(action.payload);
    },
    removeBookmark: (state, action: PayloadAction<any>) => {
      state.bookmarks = state.bookmarks.filter(item => item.id !== action.payload.id); 
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
