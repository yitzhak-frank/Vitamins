const Input = ({inputData: {type, field, placeholder, inputsFocus}, inputFn: {formik, setInputsFocus}}) => {
    return(
        <>
            <input
                noValidate="1"
                type={type} 
                id={field} 
                name={field} 
                placeholder={placeholder}
                value={formik.values[field]}
                className={inputsFocus[field]? "form-control shadow": "form-control"} 
                onChange={formik.handleChange}
                onFocus={() => setInputsFocus(inputs => ({...inputs, [field]: true}))}
                onBlur={(e) => {
                    formik.handleBlur(e);
                    setInputsFocus(inputs => ({...inputs, [field]: false}));
                }}
            />
            {formik.touched[field] && formik.errors[field]? 
                <small className="text-danger text-right d-block">{formik.errors[field]}</small>: null
            }
        </>
    )
}

export default Input;