import { useHistory } from "react-router";
import { useState } from "react";
import useWindowSize from "../../hooks/screenSize";

const BackBtn = () => {

    const { width } = useWindowSize();
    const history = useHistory();
    const[iOver, setIOver] = useState(false);

    const styles = {
        i: {
            position: 'fixed', 
            top: '90px', 
            left: '15px', 
            fontSize: width > 550 ? '30px' : '25px', 
            padding: '7.5px', 
            boxShadow: iOver ? '0 0 8px black' : '0 0 6px gray', 
            borderRadius: '10px', 
            backgroundColor: 'rgb(204,204,204)',
            color: iOver ? 'black' : '#555',
            transform: iOver && 'scale(1.05)',
            transition: '0.5s'
        }
    }

    return(
        <i 
            className="far fa-arrow-alt-circle-left" 
            style={styles.i}
            onMouseOver={() => setIOver(true)}
            onMouseLeave={() => setIOver(false)}
            onClick={() => history.goBack()}
        ></i>     
    )
}

export default BackBtn;