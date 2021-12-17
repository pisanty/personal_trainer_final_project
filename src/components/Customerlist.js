import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
//import { CSVLink } from 'react-csv';
//import {URL} from '../constants.js'

function Customerlist() {
    const [customers, setCustomers] = useState([])
    const [show, setShow] = useState(false)
    const [msg, setMsg] = useState('')
  
    useEffect(() => {
      fetchCustomers()
    }, [])
  
    const fetchCustomers = () => {
      fetch(URL + 'customers')
        .then((response) => response.json())
        .then((data) => setCustomers(data.content))
        .catch((err) => console.error(err))
    }
  
  
    const columns = [
      { field: 'firstname', sortable: true, filter: true },
      { field: 'lastname', sortable: true, filter: true },
      { field: 'streetaddress', sortable: true, filter: true },
      { field: 'postcode', sortable: true, filter: true },
      { field: 'city', sortable: true, filter: true },
      { field: 'email', sortable: true, filter: true },
      { field: 'phone', sortable: true, filter: true },
      {
         //  
      }, 
    ]
    return (
      <div>
        <div className="ag-theme-alpine">

          <AgGridReact
            rowData={customers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}
            rowHeight={50}
          />

        </div>
      </div>
    )
  }
  
export default Customerlist
  