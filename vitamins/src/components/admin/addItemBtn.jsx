import { useState } from "react";
import useScrollPosition from "../../hooks/scrollPosition";
import Tooltip from "../common/tooltip";

const AddItemBtn = ({setIndex, item}) => {

    const[tooltip, setTooltip] = useState(null);

    const scrollPositionBottom = useScrollPosition().bottom;

    const styles = { 
        addBtn: {bottom: scrollPositionBottom > 115 ? 20 : 115 - scrollPositionBottom} 
    };
    
    return(
        <>
        <i id="add-btn" className="fas fa-plus shadow bg-secondary" 
            style={styles.addBtn}
            onClick={() => setIndex(val => !val)}
            onMouseMove={setTooltip}
            onMouseLeave={() => setTooltip(null)}
        />
        {tooltip ? <Tooltip content={'הוסף ' + item} event={tooltip}/>:null}
        </>
    )
}

export default AddItemBtn;