import ItemTableTrash from "../ItemTableTrash/ItemTableTrash"
import { Table } from 'react-bootstrap'

function TableOfTable({ trashCans, stt }) {
    return (
        <Table className='table table-hover'>
            <thead className='border border-top-1 border-start-0 border-end-0' style={{ height: "38px", textAlign: "center", fontSize: "14px" }}>
                <tr>
                    <th className='fw-medium'>Trash Name</th>
                    <th className='fw-medium'>Type</th>
                    <th className='fw-medium'>Location</th>
                    <th className='fw-medium'>Address</th>
                    <th className='fw-medium'>Level Gauges</th>
                    <th className='fw-medium'>Created At</th>
                    <th className='fw-medium'>Updated At</th>
                </tr>
            </thead>
            <tbody className='text-center' style={{ height: "60px" }}>
                {trashCans?.map((item, index) => (
                    <ItemTableTrash key={index} trash={item} tableNumber={stt} />
                ))}
            </tbody>
        </Table>
    )
}

export default TableOfTable