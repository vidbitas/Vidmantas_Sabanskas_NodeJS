import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
  userId: null,
};

export const createPost = createAsyncThunk(
  'post/createPost',
  async (params) => {
    try {
      const { data } = await axios.post('/posts', params);
      console.log('postSlice ===', data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPosts = createAsyncThunk('post/getAllPosts', async (req) => {
  try {
    const { data } = await axios.get('/posts');
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removePost = createAsyncThunk('post/removePost', async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`, id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async (updatedPost) => {
    try {
      const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    // Create post
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('postSlice createPost.fulfilled === ', action.payload);
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state) => {
      state.loading = false;
    },
    // Get All posts
    [getAllPosts.pending]: (state) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.popularPosts;
    },
    [getAllPosts.rejected]: (state) => {
      state.loading = false;
    },
    // Delete post
    [removePost.pending]: (state) => {
      state.loading = true;
    },
    [removePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    },
    [removePost.rejected]: (state) => {
      state.loading = false;
    },
    // Update post
    [updatePost.pending]: (state) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      state.posts[index] = action.payload;
    },
    [updatePost.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default postSlice.reducer;
