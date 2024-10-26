import { Card } from 'react-bootstrap'
import SearchInputOfTable from '../searchInputOfTable/SearchInputOfTable'
import HeaderOfTable from '../headerOfTable/HeaderOfTable'
import TableOfTable from '../tableOfTable/TableOfTable'

function TrashList({ trashCans, stt }) {
    return (
        <Card border='0' className={stt === 1 ? 'shadow-sm p-3 mb-5 bg-body-tertiary rounded' : ''} style={stt === 2 ? { width: "100%" } : {}}>
            <div className='d-md-flex justify-content-center align-items-center'>
                <HeaderOfTable />
                {stt === 1 && (
                    <SearchInputOfTable />
                )}
            </div>
            <div className='overflow-x-auto' style={stt === 1 ? { height: "400px" } : { height: "100%" }}>
                <TableOfTable trashCans={trashCans} stt={stt} />
            </div>
        </Card>
    )
}

export default TrashList