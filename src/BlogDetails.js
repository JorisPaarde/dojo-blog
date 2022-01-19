import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "./UseFetch";


const BlogDetails = () => {
    const { id } = useParams();
    const {data: blog, error, isLoading} = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();

    const handleClick = () =>{
        fetch('http://localhost:8000/blogs/' + id, {
            method: "DELETE"
        }).then(()=>{
            history.push("/");
        })
    }

    return ( 
        <div className="blog-details">
            { isLoading && <p>'Loading...'</p>}
            { error && <p>{ error }</p>}
            { blog && <article>
                <h2>{blog.title}</h2>
                <p>Written by: {blog.author}</p>
                <p>{blog.body}</p>
                <button onClick={handleClick}>Delete</button>
                </article>}
            
        </div>
     );
}
 
export default BlogDetails;