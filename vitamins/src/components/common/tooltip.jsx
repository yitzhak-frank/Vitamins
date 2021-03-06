import useScrollPosition from "../../hooks/scrollPosition";

const Tooltip = ({content, event}) => {

    const scrollPositionTop = useScrollPosition().top
    const {pageY: top, pageX: left} = event;

    const styles = {
        tooltip: {
            position: 'fixed', 
            top: `${top - scrollPositionTop}px`, 
            left: `${left + 10}px`, 
            zIndex: 5,
            maxWidth: '220px', 
            color: 'white', 
            padding: '10px', 
            boxShadow: '0 0 6px gray', 
            whitSpace: 'pre-wrap', 
            borderRadius: '5.5px', 
            backgroundColor: '#343a40', 
        }
    }

    return (
        <div className="tooltip-box" style={styles.tooltip}>{content}</div>
    )
}

export default Tooltip;