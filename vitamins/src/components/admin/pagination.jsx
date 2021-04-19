const Pagination = ({pagesCount, currentPage, setCurrentPage}) => {
    return (
        <div id="pages-container" className="pages-container mb-3">
            <button 
                id="page-prev" 
                className="page-prev btn btn-secondary"
                onClick={() => setCurrentPage(currentPage => currentPage - 1)}
                disabled={currentPage < 1}
            > הקודם </button>
            <div className="pages-inner-container mx-2">
                {pagesCount.map(page => <button
                    key={page}
                    className={currentPage === page - 1 ? "page-btn btn m-1 btn-info" : "page-btn btn m-1 btn-outline-info"} 
                    onClick={() => setCurrentPage(page - 1)}
                >{page}</button>)}
            </div>
            <button 
                id="page-next" 
                className="page-next btn btn-secondary" 
                onClick={() => setCurrentPage(currentPage => currentPage + 1)}
                disabled={currentPage >= pagesCount.length - 1}
            > הבא </button>
        </div>
    );
}

export default Pagination;