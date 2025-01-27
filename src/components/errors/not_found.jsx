
import { Link } from "react-router-dom";
import "../../../public/css/page_not_found.css";


function PageNotFound() {
    return (
        <div id="not_found">
            <div className="content-not-found">
                <h1>Page Not Found</h1>
                <Link to={"/"} className="button-go-home">Go to home</Link>
            </div>
        </div>
    );
}

export default PageNotFound;