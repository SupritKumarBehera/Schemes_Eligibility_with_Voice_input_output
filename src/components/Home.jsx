function Home({ onStart }) {
  return (
    <div className="home">
      <h1>सरकारी योजना सहायक</h1>
      <p>सरकारी योजनाओं की जानकारी आवाज़ में प्राप्त करें</p>
      <button className="start-btn" onClick={onStart}>
        शुरू करें
      </button>
    </div>
  );
}

export default Home;
