import BlogList from "./BlogList";
import useFetch from "./useFetch";
const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch("http://localhost:3000/blogs");
  const title = "All Blog";

  //useEffect原本位置
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title={title} />}
    </div>
  );
};

export default Home;
