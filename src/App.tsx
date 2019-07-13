import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
// 참고: https://github.com/electron/electron/issues/7300, https://github.com/electron/electron/issues/9920 
const { ipcRenderer } = window.require("electron");

const App: React.FC = () => {
  const [posts, setPosts] = useState<Array<any>>([]);

  useEffect(() => {
    axios
      .get("https://reddit.com/r/aww.json")
      .then(res => {
        console.log(res.data.data.children);
        setPosts(res.data.data.children);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const showImage = (image: any) => {
    ipcRenderer.send('toggle-image', image);
  }

  return (
    <div className="App">
      <ul className="list-group">
        {posts.map(post => (
          <li onClick={() => {showImage(post.data.preview.images[0].source.url)}} key={post.data.id} className="list-group-item flex-container">
            <img src={post.data.thumbnail} alt="thumb" className="thumbnail" />
            <div>{post.data.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
