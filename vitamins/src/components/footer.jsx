const Footer = () => {

    return(
        <footer className="bg-dark">
             <div id="social">
                <a className="icon facebook" href="https://facebook.com" target="_blank" rel="noreferrer">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a className="icon twitter" href="https://twitter.com" target="_blank" rel="noreferrer">
                    <i className="fab fa-twitter"></i>
                </a>
                <a className="icon instagram" href="https://instagram.com" target="_blank" rel="noreferrer">
                    <i className="fab fa-instagram"></i>
                </a>
                <a className="icon youtube" href="https://youtube.com" target="_blank" rel="noreferrer">
                    <i className="fab fa-youtube"></i>
                </a>
            </div>
            <div className="footerCover">
                <h2 id="copyright">
                    <span className="simble">&#169;</span>
                    This site was created by <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/yitzhak-frank-2b9417207"> Myself.</a>
                </h2>
            </div> 
        </footer>
    );
}

export default Footer;