import { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import useWindowSize from "../hooks/screenSize";

const MyCarousel = ({images}) => {

    const { width } = useWindowSize();

    const styles = {
        heading: { fontSize: width > 1000 && '3rem', position: 'absolute', top: width > 500 ? '200px': '120px', zIndex: 2}
    }
    
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return(
        <div id="carousel" className="mx-auto">
            <h3 className="w-100 text-center text-white" style={styles.heading}>ברוכים הבאים לויטמינים</h3>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {images ? images.map(img => (
                <Carousel.Item key={img}>
                    <img className="d-block w-100 carousel-img" src={img} alt={img} style={{opacity: 0.8}}/>
                </Carousel.Item>
                )):''}
            </Carousel>
        </div>
    )
}

export default MyCarousel;