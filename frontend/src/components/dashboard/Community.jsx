import { useState, useEffect } from "react";
import axios from "axios";

function Community({ communityId }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    axios.get(`/api/community/${communityId}/posts`).then((res) => {
      setPosts(res.data);
    });
  }, [communityId]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const postData = { content: newPost, communityId };
    const response = await axios.post(`/api/community/${communityId}/posts`, postData);
    setPosts([response.data, ...posts]);
    setNewPost("");
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Community Discussion</h2>
      
      <form onSubmit={handlePostSubmit} className="mb-4">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share something with the community..."
          className="w-full p-2 border rounded"
        ></textarea>
        <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">Post</button>
      </form>

      <div className="space-y-2">
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to start a discussion!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="p-2 border-b">
              <p>{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Community;
