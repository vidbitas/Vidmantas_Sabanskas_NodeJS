import React, { useState, useEffect } from 'react';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import CountdownTimer from '../components/CountdownTimer/CountdownTimer';
import { getRemainingTimeUntilMsTimestamp } from './CountdownTimer/Utils/CountdownTimerUtils';

export const PostItem = ({ post, loginUserName }) => {
  const [outTime, setOutTime] = useState(false);

  if (!post) {
    return;
  }

  const getTime = (date) => {
    const getTimer = getRemainingTimeUntilMsTimestamp(date);
    if (
      getTimer.seconds === '00' &&
      getTimer.minutes === '00' &&
      getTimer.hours === '00' &&
      getTimer.days === '00'
    ) {
      setOutTime(true);
    }

    return date;
  };

  return (
    <Link to={loginUserName ? `/${post._id}` : ''}>
      <div className='flex flex-row basis-1/4 px-5 border-2 pt-3 pb-2 rounded-r-3xl'>
        <div className='w-1/2'>
          <div>
            <Link to={`/${post._id}`}>
              {post.announce === 1 && (
                <span className='bg-lime-400 text-xs text-black opacity-50 p-1 rounded-r-3xl'>
                  Published
                </span>
              )}
              {post.announce === 0 && (
                <span className='bg-orange-400 text-xs text-black opacity-80 p-1 rounded-r-3xl'>
                  No published
                </span>
              )}
            </Link>
          </div>
          <div
            className={
              post.imgUrl
                ? 'flex rouded-sm h-80'
                : 'flex rounded-sm w-fit rounded-r-3xl'
            }
          >
            {post.imgUrl2 && (
              <div className='flex flex-col rouded-sm h-40 w-70 text-cemter rounded-r-3xl'>
                <img
                  src={post.imgUrl2}
                  alt='img'
                  className='w-80 h-40 pr-3 mt-5 rounded-r-3xl'
                />
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col w-1/2 justify-between'>
          <div>
            <div className='flex justify-between items-center pt-2 w-100'>
              <div className='text-xs text-white opacity-50'>
                {post.username}
              </div>
              <div className='text-xs text-white opacity-50 w-100'>
                <div className='bg-white text-black text-center animate-bounce w-18 h-4 rounded-r-3xl'>
                  Entered
                </div>
                <div>
                  <Moment date={post.createdAt} format='YYYY MMM DD hh:mm:ss' />
                </div>
                <div className='bg-white text-black text-center w-18 h-4 rounded-r-3xl'>
                  Offers ends
                </div>
                <div className=' text-white'>
                  <Moment
                    date={post.announcedate}
                    format='YYYY MMM DD hh:mm:ss'
                  />
                </div>
                <div
                  className={
                    !outTime
                      ? 'bg-white text-black text-center w-18 h-4 rounded-r-3xl'
                      : 'bg-red-600 text-black text-center w-18 h-4 rounded-r-3xl'
                  }
                >
                  Left until the end
                </div>
                <div className='text-black pt-1 opacity-1'>
                  {!outTime && (
                    <CountdownTimer
                      countdownTimestampMs={getTime(post.announcedate)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='text-white text-xl mr-2 break-all'>
              {post.title}
            </div>
            <div className='text-xs text-white opacity-50'>
              <div className='text-black w-18 rounded-r-3xl text-xl h-20 bg-white'>
                <span className='p-2 text-black opacity-80 text-xs line-clamp-4 break-all'>
                  {post.text}
                </span>
              </div>
            </div>
          </div>
          <div className='flex gap-3 items-center mt-2 justify-between'>
            <div className='flex justify-between gap-3'>
              <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                <AiFillEye /> <span>{post.views} VIEWS</span>
              </button>
              <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                <AiOutlineMessage />{' '}
                <span>{post.comments?.length || 0} LIKES</span>
              </button>
            </div>
            <div>
              <p className='text-xs text-black-600 opacity-90 bg-yellow-300 p-1 rounded-r-3xl'>
                Price: {post.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
