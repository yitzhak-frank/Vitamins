import useWindowSize from "../../hooks/screenSize";
import useScrollPosition from "../../hooks/scrollPosition"

const BackToTopBtn = () => {

    const scrollPosition = useScrollPosition();
    const { width } = useWindowSize();

    const styles = {
        btn: {
            display: scrollPosition.top < 100 || document.body.clientHeight < 1500 ? 'none' : 'block', 
            opacity: scrollPosition.top/1000,
            bottom: scrollPosition.bottom < (width > 576 ? 60 : 50) && `${(width > 576 ? 70 : 75) - scrollPosition.bottom}px`
        }
    }

    const href = '#';

    return (
        <a 
            className="backToTop" 
            href={href} 
            style={styles.btn}
        ><i className="fas fa-chevron-up"></i></a>
    )
}

export default BackToTopBtn