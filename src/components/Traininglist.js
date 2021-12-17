import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import dayjs from 'dayjs'


function Trainings() {
  const [trainings, setTrainings] = useState([])
  const [show, setShow] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetchTrainings()
  }, [])

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err))
  }

  
  const columns = [
    { field: 'activity', sortable: true, filter: true },
    { field: 'duration', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true, valueFormatter: (params) => dayjs(params.value).format('DD/MM/YY hh:mm') },
    { headerName: 'Customer first name', field: 'customer.firstname', sortable: true, filter: true },
    { headerName: 'Customer last name', field: 'customer.lastname', sortable: true,  filter: true },
  ]

  return (
    <div
      className="ag-theme-alpine"
      style={{ marginTop: 200, height: 600, width: '75%', margin: 'auto' }}
    >
      <AgGridReact
        rowData={trainings}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={15}
        rowHeight={40}
      />{' '}
     
    </div>
  )
}

export default Trainings
