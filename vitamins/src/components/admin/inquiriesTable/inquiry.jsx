import { useState } from "react";
import { useEffect } from "react";
import { getItemById } from "../../../services/adminService";
import { getDateFormated, htmlEntities } from "../../../services/generalFn";
import useWindowSize from "../../../hooks/screenSize";
import UpdateInquiryStatus from "./updateInquiryStatus";
import { updateStatus } from "../../../services/inquiriesService";

const Inquiry = ({params: { id: inquiryId }}) => {

    const { width } = useWindowSize();

    const styles = {
        container: {maxWidth: '800px'},
        txt: {columnCount: width > 700 ? 2 : 1, whiteSpace: 'pre-wrap'}
    }

    const[inquiry, setInquiry] = useState({});
    const[update, setUpdaet] = useState(null);

    const {name, email, date_created, msg, status, comments} = inquiry;
    
    useEffect(() => getInquiry(), [])

    const getInquiry = async () => {
        let inquiry = await getItemById('inquiries', inquiryId);
        if(!inquiry.isOpened) updateStatus({isOpened: true}, inquiryId);
        setInquiry(inquiry);
    }

    return(
        <>
        {inquiry && 
        <>
        <div className="top-space" style={{height: '50px'}}></div>
        <div className="container pt-5 mx-auto" style={styles.container}>
            <h1 className="text-center text-info"> פניית לקוח.</h1>
            <div className="row inquiry-details mt-3">
                <div className="col-12 col-md-6">
                    <h6 className="text-center text-md-left">שם הלקוח: <span className="text-info">{htmlEntities(name)}</span></h6>
                </div>
                <div className="col-12 col-md-6">
                    <h6 className="text-center text-md-right">תאריך פנייה: <span className="text-info">{getDateFormated(date_created)}</span></h6>
                </div>
            </div>
            <h4 className="text-info text-center pt-4">תוכן הפנייה:</h4>
            <div className="p-3 pt-1 mx-auto" style={styles.txt}>
                <p className="text-justify text-dark">{htmlEntities(msg)}</p>
            </div>
            <div className="text-center mb-3">
                <h4 className="text-info ">סטטוס:</h4> 
                <span className="text-dark">{htmlEntities(status)}</span>
            </div>
            <h4 className="text-info text-center mt-2">הערות:</h4>
            <div className="p-3 pt-1 mx-auto" style={styles.txt}>
                <p className="text-justify text-dark">{htmlEntities(htmlEntities(comments))}</p>
            </div>
            <div className="buttons my-5">
                <a 
                    href={`mailto:${email}`} 
                    className="btn btn-lg btn-outline-primary d-block" 
                    rel="noreferrer" 
                    target="_blank"
                >שלח אימייל תגובה</a>
                <button className="btn btn-lg btn-outline-info btn-block mt-1" onClick={() => setUpdaet(inquiry)}>עדכן סטטוס</button>
            </div>
        </div>
        <div className="top-space" style={{height: '100px'}}></div>
        {update ? <UpdateInquiryStatus inquiry={inquiry} close={() => setUpdaet(null)}/> :null}
        </>
        }
        </>
    )
}

export default Inquiry;