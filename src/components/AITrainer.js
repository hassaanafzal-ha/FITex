import React from 'react';
import './AITrainer.css'; // Add styling specific to this page

const AITrainer = () => {
  return (
    <div className="ai-trainer-container">
      {/* Header Section */}
      <header className="ai-trainer-header">
  <h1>
    <span className="fitex">FITex</span>
    <span className="ai-trainer">AI Trainer</span>
  </h1>
</header>


      <div className="ai-trainer-main">
        {/* Main Content Section */}
        <section className="ai-trainer-content">
          <div className="ai-trainer-examples">
            <h2>Examples</h2>
            <p>"Explain how to maintain body mass ratio"</p>
            <p>"What exercise one should do on a daily basis?"</p>
            <p>"How do I make my routine tasks on the go?"</p>
          </div>
          <div className="ai-trainer-trainer">
            <h2>Trainer Questions</h2>
            <p>Give motivational quotes, gym-related queries, etc.</p>
            <p>Allows user to provide follow-up healthy routines.</p>
            <p>Trained to be punctual on daily half-hour walk, etc.</p>
          </div>
          <div className="ai-trainer-limitations">
            <h2>Limitations</h2>
            <p>May occasionally generate incorrect information.</p>
            <p>May occasionally produce harmful instructions or biased content.</p>
            <p>Limited knowledge of some exercises and eatables.</p>
          </div>
        </section>

        {/* Sidebar Section */}
        <aside className="ai-trainer-sidebar">
          <div className="sidebar-header">
            <button className="new-chat-btn">+ New Chat</button>
          </div>
          <div className="chat-history">
            <h3>Chat History</h3>
            <ul>
              <li>Chat with AI Trainer #1</li>
              <li>Chat with AI Trainer #2</li>
              <li>Chat with AI Trainer #3</li>
            </ul>
          </div>
          <div className="sidebar-footer">
            <ul>
              <li>My Account</li>
              <li>Updates & FAQ</li>
              <li className="exit-option">Exit</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Footer Section */}
      <footer className="ai-trainer-footer">
        <div className="chat-interface">
          <input type="text" placeholder="What AI can help you in Exercise?" />
          <button>Send</button>
        </div>
      </footer>
    </div>
  );
};

export default AITrainer;
