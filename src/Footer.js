import React from "react";
import { useStoreState } from "easy-peasy";

const today = new Date()

const Footer = () => {
  const postCount = useStoreState((state) => state.postCount);
  return (
    <footer className="Footer">
      <p>{postCount} Blog Posts</p>
      <p>Copyright &copy; {today.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
