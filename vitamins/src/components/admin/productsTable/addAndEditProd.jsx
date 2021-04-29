import { addItem, editItem, uploadProdImg } from "../../../services/adminService";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "../../common/input";

const AddAndEditProd = ({prod, fn: {closeForm, reRender}}) => {

    const[prodImg, setProdImg] = useState(prod ? prod.image : '')
    const[inputsFocus, setInputsFocus] = useState({});

    const styles = {
        formContainer: {width: '100%', height: '100%'},
        form: {backgroundColor: '#ddd', maxWidth: '700px', maxHeight: '550px', overflowY: 'auto'},
        textarea: {height: '90%', whiteSpace: 'pre-wrap'},
        image: {
            backgroundImage: `url('${prodImg}')`,
            backgroundSize: 'contain', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '150px', transform: 'scale(0.9)'
        }
    }

    const validate = values => {
        const errors = {};

        if(!values.name) errors.name = ' *שדה חובה';
        else if(values.name.length < 2) errors.name = ' *אורך השם חייב להיות לפחות שני תוים';
        else if(values.name.length > 100) errors.name = ' *אורך השם לא יכול להיות גדול ממאה תוים';

        if(!values.description) errors.description = ' *שדה חובה';
        else if(values.description.length < 6) errors.description = ' *אורך התיאור חייב להיות לפחות שישה תוים';
        else if(values.description.length > 1000) errors.description = ' *אורך התיאור לא יכול להיות גדול מאלף תוים';

        if(!values.price) errors.price = ' *שדה חובה';
        else if(values.price < 10) errors.price = ' * המחיר חייב להיות לפחות שני ספרות';
        else if(values.price > 9999) errors.price = ' *המחיר לא יכול להיות יותר מארבע ספרות';

        if(!values.more_info) errors.more_info = ' *שדה חובה';
        else if(values.more_info.length < 6) errors.more_info = ' *אורך האינפורמציה חייב להיות לפחות שישה תוים';
        else if(values.more_info.length > 1000) errors.more_info = ' *אורך האינפורמציה לא יכול להיות גדול מאלף תוים';

        return errors;
    }

    const onSubmit = async values => {
        let imgUrl = await uploadImage();
        if(!imgUrl) return;
        values.image = imgUrl;
        if(
            prod && 
            prod.name        === values.name && 
            prod.description === values.description && 
            prod.price       === values.price &&
            prod.more_info   === values.more_info &&
            prod.image       === values.image
        ) return toast.warning('הזן מידע חדש בשביל לעדכן');
        try {
            if(!prod) await addItem('prods', values);
            else await editItem('prods', prod._id, values);
            closeForm(null);
            reRender(val => !val);
            toast(`הפריט ${prod ? 'התעדכן' : 'התווסף'} בהצלחה`);
        } catch(err) { toast.error('משהו השתבש נסה שנית מאוחר יותר') }
    }

    const formik = useFormik({
        initialValues: {
            name:        prod ? prod.name : '',
            description: prod ? prod.description : '',
            price:       prod ? prod.price : '',
            more_info:   prod ? prod.more_info : '',
            image:       ''
        },
        validate,
        onSubmit
    });

    /**
     * @returns {promise} Promise with the old / new image url or null if there is no image.
     */
    const uploadImage = async () => {
        let image = document.querySelector('#image').files[0];

        if(!image && !prod) return toast.error('לא ניתן להוסיף מוצר ללא תמונה') && null;
        else if(!image && prod) return prod.image;

        let body  = new FormData();
        body.append('myImg', image);

        try {
            let {data: {imgUrl}} = await uploadProdImg(body, prod ? prod._id : '');
            return imgUrl;
        } catch(err) { 
            toast.error('אירעה שגיאה בהעלאת התמונה נסה שנית מאוחר יותר');
            return prod ? prod.image : null 
        }
    }

    const displayNewImage = (input) => {
        if(!input.value || !validateImage(input ,input.files[0])) return;
        let fileReader = new FileReader();
        fileReader.onload = (e) => setProdImg(e.target.result);
        fileReader.readAsDataURL(input.files[0]);
    }

    /**
     * Checks the provided file type if image and size if bigger then 5 MB.
     * @param {object} input Object contains the input file element.
     * @param {object} file Object contains all file uploaded data.
     * @returns {boolean} Bool to indicate whether the file is allowed or not.
     */
    const validateImage = (input ,file) => {
        const MB_5 = 1024 * 1024 * 5;
        if(!file.type || !file.type.includes('image')) {
            toast.warning('!יש להעלות קובץ מסוג תמונה בלבד');
            input.value = null;
            return false;
        } else if(file.size > MB_5) {
            toast.warning('!אין אפשרות להעלות תמונה מעל 5 מגהבייט');
            input.value = null;
            return false;
        } else return true;
    }

    return (
        <div className="prod-form-container d-flex justify-content-center align-items-center" style={styles.formContainer}>
            <form 
                className="form p-4 m-2" 
                style={styles.form}
                onSubmit={formik.handleSubmit}
            >
                <h4 className="text-center text-info">פרטי המוצר</h4>
                <div className="row pt-2">
                    <div className="form-group col-sm-12 col-md-6">
                        <label className="d-block text-right" htmlFor="name">שם מוצר:</label>
                        <Input
                            inputData={{type: 'text', field: 'name', placeholder: 'שם מוצר', inputsFocus}}
                            inputFn={{formik, setInputsFocus}}
                        />
                    </div>
                    <div className="form-group col-sm-12 col-md-6">
                        <label className="d-block text-right" htmlFor="description">תיאור:</label>
                        <Input
                            inputData={{type: 'text', field: 'description', placeholder: 'תיאור', inputsFocus}}
                            inputFn={{formik, setInputsFocus}}
                        />
                    </div>
                    <div className="form-group col-sm-12 col-md-6">
                        <label className="d-block text-right" htmlFor="price">מחיר:</label>
                        <Input
                            inputData={{type: 'number', field: 'price', placeholder: 'מחיר', inputsFocus}}
                            inputFn={{formik, setInputsFocus}}
                        />
                    </div>
                    <div className="form-group col-sm-12 col-md-6">
                        <label className="d-block text-right" htmlFor="image">תמונה:</label>
                        <div className="custom-file">
                            <input
                                type="file" id="image" name="image"
                                className={inputsFocus.image? "shadow custom-file-input": "custom-file-input"} 
                                onChange={({target}) => displayNewImage(target)}
                                onFocus={() => setInputsFocus(inputs => ({...inputs, image: true}))}
                                onBlur={() => setInputsFocus(inputs => ({...inputs, image: false}))}
                            />
                            <label htmlFor="image" className="custom-file-label">בחר תמונה</label>
                        </div>
                    </div>
                    <div className="d-md-none col-12" style={styles.image}></div>

                    <div className="form-group col-sm-12 col-md-6" style={{minHeight: '150px'}}>
                        <label className="d-block text-right" htmlFor="more_info">מידע נוסף:</label>
                        <textarea 
                            type="text" className="form-control" name="more_info" id="more_info" placeholder="מידע נוסף"
                            style={styles.textarea}
                            value={formik.values.more_info}
                            onChange={formik.handleChange}
                            onFocus={() => setInputsFocus(inputs => ({...inputs, more_info: true}))}
                            onBlur={(e) => {
                                formik.handleBlur(e);
                                setInputsFocus(inputs => ({...inputs, more_info: false}));
                            }}
                        ></textarea>
                        {formik.touched.more_info && formik.errors.more_info? 
                            <small className="text-danger text-right d-block">{formik.errors.more_info}</small>
                        :null}
                    </div>
                    <div className="d-none d-md-block col-6" style={styles.image}></div>
                </div>
                <div className="buttons d-flex pt-2">
                    <button 
                        type="button" id="close_form" className="btn btn-outline-danger m-2 btn-block"
                        onClick={() => closeForm(null)}
                    >סגור</button>
                    <button type="submit" id="submit" className="btn btn-outline-primary m-2 btn-block">שלח</button>
                </div>
            </form>
        </div>
    );
}

export default AddAndEditProd;