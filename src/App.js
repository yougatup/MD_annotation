import React from 'react';
import './App.css';

import { ChatRoom } from "./components/ChatRoom/ChatRoom.js";
import { LeftSideBar } from "./components/LeftSideBar/LeftSideBar.js";
import { RightSideBar } from "./components/RightSideBar/RightSideBar.js";

function App() {
  return (
    <div class="backGround">
      <div class="leftSideBar">
        <LeftSideBar />
      </div>
      <main class="chatGrid chatStyle">
        <ChatRoom />
      </main>
      <div class="rightSideBar">
        <RightSideBar />
      </div>
    </div>
  );
}

export default App;
