import React from 'react';
import { Link } from 'react-router-dom';

export const PopularPosts = ({ post, loginUserName }) => {
  console.log('popular === ', post);

  return (
    <div className='bg-gray-600 my-1 rounded-r-3xl'>
      {post.views > 0 && (
        <Link
          // to={`${post._id}`}
          to={loginUserName ? `${post._id}` : ''}
          className='flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white'
        >
          <div className='flex items-center'>
            <div>{post.title}</div>
            <div className='ml-5 bg-gray-300 text-gray-600 border-2 rounded-r-3xl w-6 text-center'>
              {post.views}
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};
