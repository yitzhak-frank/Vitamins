import InquiryRow from "./inquiriyRow";

const InquiriesTable = ({
    tableData: inquiries, currentPage, 
    fn: {handleDeleteItem}
}) => {

    return(
        <>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>שם לקוח</th>
                        <th>אימייל</th>
                        <th>תאריך שליחה</th>
                        <th>סטטוס</th>
                        <th>עדכון אחרון</th>
                        <th>פתיחה & מחיקה</th>
                    </tr>
                </thead>
                <tbody>
                    {inquiries.map((inquiry, index) => <InquiryRow 
                        key={inquiry._id}
                        inquiry={inquiry} 
                        fn={{handleDeleteImquiry: handleDeleteItem}}
                        index={index}
                        page={currentPage}
                    />)}
                </tbody>
            </table>
        </>
    );
}

export default InquiriesTable;