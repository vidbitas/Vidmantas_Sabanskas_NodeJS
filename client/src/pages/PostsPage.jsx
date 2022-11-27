import React from 'react';
import { useEffect, useState } from 'react';
import { PostItem } from '../components/PostItem';
import axios from '../utils/axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const loginUserName = useSelector((state) => {
    if (posts.length > 0) return state.auth.user.username;
  });

  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get('/posts/user/me');

      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  if (posts.length === 0) return;

  return (
    <Link to={loginUserName ? `/${posts._id}` : ''}>
      <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
        {posts.map((post, idx) => (
          <PostItem key={idx} post={post} loginUserName={loginUserName} />
        ))}
      </div>
    </Link>
  );
};
