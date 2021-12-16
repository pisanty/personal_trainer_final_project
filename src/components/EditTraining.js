import React from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

function EditTraining(props) {
  const [open, setOpen] = React.useState(false)
  const [training, setTraining] = React.useState({
    id: '',
    date: '',
    duration: '',
    activity: '',
    customer: '',
  })

  const handleClickOpen = () => {
    console.log(props.row)
    setTraining({
      id: props.row.data.id,
      date: props.row.data.date,
      duration: props.row.data.duration,
      activity: props.row.data.activity,
      customer: props.row.data.customer,
    })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = () => {
    props.editTraining(props.row.value, training)
    handleClose()
  }

  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="id"
            value={training.id}
            onChange={inputChanged}
            label="Id"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="date"
            value={training.date}
            onChange={inputChanged}
            label="Date"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name="customer"
            value={training.customer}
            onChange={inputChanged}
            label="Customer"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditTraining