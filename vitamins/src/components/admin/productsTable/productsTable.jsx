import ProductRow from "./productRow";
import AddAndEditProd from "./addAndEditProd";
import useScrollPosition from "../../../hooks/scrollPosition";

const ProductsTable = ({
    tableData: products, currentPage, addItemIndex, itemToEdit: prodToEdit, 
    fn: {reRender, handleDeleteItem, handleCloseForm, setAddItemIndex, setItemToEdit}
}) => {

    const scrollPositionBottom = useScrollPosition().bottom;

    const styles = { 
        addBtn: {bottom: scrollPositionBottom > 115 ? 20 : 115 - scrollPositionBottom} 
    };
    
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
            <i id="add-btn" className="fas fa-plus shadow bg-secondary" 
                style={styles.addBtn}
                onClick={() => setAddItemIndex(!addItemIndex)}
            />

            {addItemIndex ? 
                <div className="dark-form-cover" onClick={handleCloseForm}>
                    <AddAndEditProd fn={{closeForm: setAddItemIndex, reRender}}/>
                </div>
            :prodToEdit ? 
                <div className="dark-form-cover" onClick={handleCloseForm}>
                    <AddAndEditProd prod={prodToEdit} fn={{closeForm: setItemToEdit, reRender}}/>
                </div>:''
            }
        </>
    )
}

export default ProductsTable;