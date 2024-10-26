import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function SearchInputOfTable() {
    return (
        <div className='w-100'>
            <div className='d-flex justify-content-start align-items-center border border-1 rounded-3' style={{ width: '300px', height: "32px" }}>
                <div className='' style={{ height: "50%", width: "10%", paddingLeft: "10px" }}>
                    <FontAwesomeIcon style={{ fontSize: "12px", color: "grey" }} icon={faMagnifyingGlass} />
                </div>
                <input placeholder='Search' style={{ backgroundColor: "inherit" }} />
            </div>
        </div>
    )
}

export default SearchInputOfTable