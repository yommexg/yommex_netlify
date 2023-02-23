import React from "react";
import { useStoreState } from "easy-peasy";
//import DataContext from "./context/DataContext";
import Feed from "./Feed";

const Home = ({ fetchError, isLoading }) => {
  const searchResults = useStoreState((state) => state.searchResults);
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}
      {!isLoading &&
        !fetchError &&
        (searchResults ? (
          <Feed posts={searchResults} />
        ) : (
          <p className="statusMsg">No posts to display</p>
        ))}
    </main>
  );
};

export default Home;
