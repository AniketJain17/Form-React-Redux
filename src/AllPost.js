import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProperElements from './properElements';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './styles/hello.module.css';
import { fetchApiData } from './redux/postsAction';

const AllPost = () => {
  const [loading, setLoading] = useState(true);
  const posts = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.length === 0) {
        try {
          // Fetch API data using the new Redux action
          await dispatch(fetchApiData());

          const savedPosts = localStorage.getItem('posts');
          const parsedPosts = savedPosts ? JSON.parse(savedPosts) : [];

          for (let i = 0; i < 20; i++) {
            if (localStorage.getItem(i + 1)) {
              const data = JSON.parse(localStorage.getItem(i + 1));
              parsedPosts.push(data);
            }
          }

          dispatch({
            type: 'LOAD_POSTS',
            posts: parsedPosts,
          });
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      } else {
        setLoading(false);
        const savedPosts = localStorage.getItem('posts');
        const parsedPosts = savedPosts ? JSON.parse(savedPosts) : [];

        for (let i = 0; i < 20; i++) {
          if (localStorage.getItem(i + 1)) {
            const data = JSON.parse(localStorage.getItem(i + 1));
            parsedPosts.push(data);
          }
        }

        dispatch({
          type: 'LOAD_POSTS',
          posts: parsedPosts,
        });
      }
    };

    fetchData();
  }, [dispatch]);

  const totalCount = posts.length;

  return loading ? (
    <>
      <div className="loader-container">
        <div className="loader"></div>
        <div className="loading-text">Loading...</div>
        <Skeleton />
        <Skeleton count={20} />
      </div>
    </>
  ) : (
    <div>
      <center style={{ backgroundColor: 'blue', borderRadius: '10px' }}>
        <h2 className="totalCount" style={{ color: 'white', fontSize: '20px' }}>
          Total Items : <span className="total">{totalCount}</span>
        </h2>
      </center>

      <table>
        <thead>
          <tr style={{ backgroundColor: 'white' }}>
            <th>UserId</th>
            <th>CreatedAt</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Street Address</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Country</th>
            <th>Gender</th>
            <th>Hobbies</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((entry, index) => (
            <ProperElements post={entry} key={entry.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPost;
