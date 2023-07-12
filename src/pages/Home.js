import styles from '../styles/home.module.css';
import Comment from '../components/Comment';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import { getPosts } from '../api';
const Home = () => {
  // const auth=useAuth();
  const [posts,setposts]=useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{  
    const fetchPosts=async ()=>{
      const response=await getPosts();
      
      if(response.success){
        setposts(response.data.posts)
      }
      setLoading(false);
    };
    fetchPosts();
  },[]);
  if(loading){
    return <Loader />
  }
  return (
    <div className={styles.postsList}>
      {posts.map(post=>
        <div className={styles.postWrapper} key={`post-${post._id}`}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
              alt="user-pic"
            />
            <div>
              <span className={styles.postAuthor}>{post.user.name}</span>
              <span className={styles.postTime}>a minute ago</span>
            </div>
          </div>
          <div className={styles.postContent}>{post.content}</div>

          <div className={styles.postActions}>
            <div className={styles.postLike}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/456/456115.png"
                alt="likes-icon"
              />
              <span>5</span>
            </div>

            <div className={styles.postCommentsIcon}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/2190/2190552.png"
                alt="comments-icon"
              />
              <span>2</span>
            </div>
          </div>
          <div className={styles.postCommentBox}>
            <input placeholder="Start typing a comment" />
          </div>

          <div className={styles.postCommentsList}>
            {post.comments.map((comment)=>(
              <Comment comment={comment}/>
            ))}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Home;
