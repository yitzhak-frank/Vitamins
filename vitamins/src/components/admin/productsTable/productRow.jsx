import useWindowSize from "../../../hooks/screenSize";
import { getDateFormated, htmlEntities } from "../../../services/generalFn";

const ProductRow = ({ prod, fn: {handleDeleteProd, setProdToEdit}, index, page }) => {
    const {name, price, description, more_info, image, date_created, _id} = prod;
    const { width } = useWindowSize();
    const divStyle = {height: width < 1029 ? '80px' : '50px'};
    return(
        <tr>
            <td>{(page * 10) + index + 1}</td>
            <td className="text-success">{name}</td>
            <td><div style={divStyle}>{htmlEntities(description)}</div></td>
            <td><div className="text-left" style={divStyle}><small>{htmlEntities(more_info)}</small></div></td>
            <td className="text-success">{price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} ₪</td>
            <td><img src={image} alt=""/></td>
            <td>{getDateFormated(date_created)}</td>
            <td>
                <button className="btn btn-outline-primary edit m-1" onClick={() => setProdToEdit(prod)}>עריכה</button>
                <button className="btn btn-outline-danger delete" onClick={() => handleDeleteProd(_id)}>מחיקה</button>
            </td>
        </tr>
    );
}

export default ProductRow;