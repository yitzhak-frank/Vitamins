import { useState } from "react";

const ProdDetails = ({prod: {name, dscription, more_info, price, image, _id}, fn: {hideProd, handleAddToCart}}) => {

    const[amount, setAmount] = useState(1);

    const changeAmount = (pointer) => {
        if(amount + pointer > 99 || amount + pointer < 1) return;
        setAmount(amount => amount + pointer);
    }

    return (
        <div className="container bg-light p-0">
            <h1 className="close font-weight-bold text-danger" onClick={hideProd}>&#x2715;</h1>
            <div className="img-container w-50 h-100 float-left"
                style={{background: `url(${image})no-repeat center`}}></div>
            <div className="content pl-5 pr-5 pb-5 float-right w-50">
                <h3 className="text-center text-success pt-5">{name}</h3>
                <h5 className="mt-2 text-center text-info">{dscription}</h5>
                <p className="text-justify pt-3">{more_info}</p>
                <div className="bottom">
                    <div className="amount">
                        <div className="increace plus" onClick={() => changeAmount(1)}>+</div>
                        <div className="text-center current-amount">{amount}</div>
                        <div className="reduce minus" onClick={() => changeAmount(-1)}>-</div>
                    </div>
                    <h5 className="mt-2 text-center text-success original-price">{price} ₪</h5>
                    {amount > 1 && <span className="text-info prod-final-price">
                        סך הכל {(price * amount).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} ₪
                    </span>}      
                    <i className="fas fa-cart-plus shadow add-to-cart-2" onClick={() => handleAddToCart(_id, price, amount) || hideProd()}></i>
                </div>
            </div>
        </div>
    );
}

export default ProdDetails;