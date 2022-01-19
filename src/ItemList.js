import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ItemList = ({ items, className1, className2, title, itemName }) => {

    return ( 
        <div className={className1}>
            <h1>{title}</h1>
            {items.map(item => (
                <Link to={`/blogs/${item.id}`} key={item.id}>
                <div className={className2}>
                    <h2>{ item.title }</h2>
                    <p>Written by { item.author }</p>
                </div>
                </Link>
            )).reverse()}
        </div>
     );
}
 
export default ItemList;