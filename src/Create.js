import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIspending] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();

    function handleErrors(response) {
        if (!response.ok) {
            throw Error('Failed to save your blog...');
        }
        return response.json();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };

        setIspending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blog)
        }).then(handleErrors)
            .then(() => {
                console.log('new blog added');
                setIspending(false);
                setError(null);
                history.push('/');
            }).catch(err => {
                console.log(err.message);
                setIspending(false);
                setError(err.message);
            }
            );
    }

    return (
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog title</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="luigi">luigi</option>
                </select>
                {!isPending && <button>Add blog</button>}
                {isPending && <button disabled>Adding blog.....</button>}
                <p>{title}</p>
                <p>{body}</p>
                <p>{author}</p>
                <p>{error}</p>
            </form>
        </div>
    );
}

export default Create;