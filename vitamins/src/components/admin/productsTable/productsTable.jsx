import ProductRow from "./productRow";
import AddAndEditProd from "./addAndEditProd";
import AddItemBtn from "../addItemBtn";

const ProductsTable = ({
    tableData: products, currentPage, addItemIndex, itemToEdit: prodToEdit, 
    fn: {reRender, handleDeleteItem, handleCloseForm, setAddItemIndex, setItemToEdit}
}) => {

    return (
        <>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>שם מוצר</th>
                        <th>תיאור</th>
                        <th>מידע נוסף</th>
                        <th>מחיר</th>
                        <th>תמונה</th>
                        <th>תאריך הוספה</th>
                        <th>עריכה & מחיקה</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod, index) => <ProductRow 
                        key={prod._id}
                        prod={prod} 
                        fn={{setProdToEdit: setItemToEdit, handleDeleteProd: handleDeleteItem}} 
                        index={index} 
                        page={currentPage}
                    />)}
                </tbody>
            </table>
            
            <AddItemBtn setIndex={setAddItemIndex} item={'מוצר'}/>

            {addItemIndex || prodToEdit ? 
                <div className="dark-form-cover" onClick={handleCloseForm}>
                    <AddAndEditProd prod={prodToEdit} fn={{closeForm: (prodToEdit ? setItemToEdit : setAddItemIndex), reRender}}/>
                </div>
            :''}
        </>
    )
}

export default ProductsTable;