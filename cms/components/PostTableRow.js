import React from 'react';
import { format } from 'date-fns';
import UserBadge from './UserBadge';

const PostTableRow = ({ post }) => {
  const { mainImage, title, author, createdAt, isPublished } = post;
  return (
    <>
      <td>
        <div className='flex items-center space-x-3'>
          <div className='avatar'>
            <div className='mask mask-squircle w-12 h-12'>
              <img
                src={
                  mainImage ? mainImage : 'https://placeimg.com/80/80/people'
                }
                alt='Avatar Tailwind CSS Component'
              />
            </div>
          </div>
          <div>
            <div className='font-bold'>{title}</div>
            <div className='text-sm opacity-50'>
              {format(new Date(createdAt), 'MMMM d yyyy')}
            </div>
          </div>
        </div>
      </td>
      <td>
        {author.fullName}
        <br />
        <UserBadge role={author.role} />
      </td>
      <td>
        <input type='checkbox' className='toggle' checked={isPublished} />
      </td>
    </>
  );
};

export default PostTableRow;