import { Link } from "react-router-dom";

const CartItem = ({
    item: {name, image, price, payment, amount, _id: prodId}, 
    fn: {handelChangeAmount, handelRemoveFromCart, handleSelectItem},
    style
}) => {
    return(
        <div className="col-12 cart-item">
            <div className="m-1 p-3 shadow cart-item-body" style={style} onClick={(e) => handleSelectItem(e, prodId)}>
                <Link to={`/product-details/${prodId}`}>
                    <img className="float-left w-25 pb-1 cart-img" src={image} alt="Vitamin"/>
                </Link>
                <div className="w-75 pl-4">
                    <i className="fas fa-trash-alt float-right" onClick={() => handelRemoveFromCart(prodId)}></i>
                    <h6 className="text-success">{name} 
                        <small className="text-info"> ₪{price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</small>
                    </h6>
                    <h6 className="text-info">
                        <span>
                            {payment.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} 
                        </span> ₪
                    </h6>
                    <div className="amount float-right">
                        <div className="increace" onClick={() => handelChangeAmount(prodId, 1)}>+</div>
                        <div className="text-center">{amount}</div>
                        <div className="reduce" onClick={() => handelChangeAmount(prodId, -1)}>-</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;