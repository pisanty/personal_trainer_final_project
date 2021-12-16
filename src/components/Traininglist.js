import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import Button from '@mui/material/Button'
import AddTraining from './AddTraining'
import Snackbar from '@mui/material/Snackbar'
import EditTraining from './EditTraining'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
//import { CSVLink } from 'react-csv';
import * as dayjs from 'dayjs'


function Traininglist() {
  const [trainings, setTrainings] = useState([])
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')

  const handleClose = () => {
    setOpen(false)
  }
  
  useEffect(() => {
    fetchTrainings()
  }, [])

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err))
  }
  

  const deleteTraining = (link) => {
    if (window.confirm('Are you sure? The training will be deleted!')) {
      fetch('https://customerrest.herokuapp.com/api/trainings', { method: 'DELETE'})
      .then(res => {
        toast.success("Training deleted", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        this.fetchTrainings();
      })
      .catch(err => {
        toast.error("Error when deleting", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err)
      }) 
    } 
  }

  const addTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', 
      { method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(training)
      })
    .then(res => this.fetchTrainings())
    .catch(err => console.error(err))
  } 

  
  const editTraining = (link, updatedTraining) => {
    fetch(link, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTraining),
    })
    .then(res => {
      toast.success("Changes saved", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      this.fetchTrainings()
    })
    .catch(err => 
      toast.error("Error when saving", {
        position: toast.POSITION.BOTTOM_LEFT
      })
      )
    }
  
    const columns = [
      { field: 'id', sortable: true, filter: true },
      { field: 'date', sortable: true, filter: true, 
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY hh:mm')},
      { field: 'duration', sortable: true, filter: true },
      { field: 'activity', sortable: true, filter: true },
      { field: 'customer', sortable: true, filter: true },
      
  
      {
        headerName: '',
        sortable: false,
        filter: false,
        width: 120,
        field: '_links.self.href',
        cellRendererFramework: (params) => (
          <EditTraining row={params} editTraining={editTraining} />
        ),
      },
  
      {
        headerName: '',
        sortable: false,
        filter: false,
        width: 120,
        field: '_links.self.href',
        cellRendererFramework: (params) => (
          <Button
            size="small"
            color="error"
            onClick={() => deleteTraining(params.value)}
          >
            Delete
          </Button>
        ),
      },
    ]
  
    return (
      <div>
        <AddTraining addTraining={addTraining} />
        <div
          className="ag-theme-material"
          style={{ marginTop: 20, height: 600, width: '90%', margin: 'auto' }}
        >
          <AgGridReact
            rowData={trainings}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}
            suppressCellSelection={true}
          />
        </div>
        <Snackbar
          open={open}
          message={msg}
          autoHideDuration={3000}
          onClose={handleClose}
        />
     
      
      </div>
    );
  
}
export default Traininglist
