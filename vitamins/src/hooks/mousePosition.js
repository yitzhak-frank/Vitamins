const useMousePosition = (event) => {
    
    const getMousePosition = ({pageY, pageX}) => ({top: pageY, left: pageX})

    return getMousePosition(event);
}

export default useMousePosition;
