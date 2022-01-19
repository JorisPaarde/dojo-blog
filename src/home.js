import ItemList from "./ItemList";
import useFetch from "./UseFetch";

const Home = () => {
   
    const {data: blogs, isLoading, error} = useFetch("http://localhost:8000/blogs");

    return (
        <div className="home">
            { isLoading && <p>'Loading...'</p>}
            { error && <p>{ error }</p>}
            { blogs && < ItemList items={blogs} itemName="blog" title="AllBlogs" className1="blog-list" className2="blog-preview" />}
        </div>
    );
}

export default Home;