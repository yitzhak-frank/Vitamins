import { Link } from "react-router-dom";

const Product = ({prod: {name, description, price, _id}, fn: {handleAddToCart}}) => {
    return (
        <div className="col-lg-6 p-2">
            <div className="border shadow">
                <Link to={`/product-details/${_id}`}>
                    <div 
                        className="img-container w-50 h-100 float-right"
                        style={{background: "url(../images/Vitamin.jpeg)no-repet center"}}
                    ></div>
                </Link>
                <h3 className="mt-4 text-center text-info">{name}</h3>
                <h5 className="mt-2 text-center text-success">{description}</h5>
                <h5 className="mt-2 text-center text-info">{price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} ₪</h5>
                <i className="fas fa-cart-plus add-to-cart" onClick={() => handleAddToCart(_id, price)}></i>
            </div>
        </div>
    );
}

export default Product;