import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import "./createTaskDialog.css";
import Select from "react-select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";

const emails = ["username@gmail.com", "user02@gmail.com"];

const CreateTaskDialog = (props) => {
  const { onClose, selectedValue, open } = props;

  //get all users
  const developers = useSelector((state) => state.developer.developers);
  //due date picker
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const options = developers.map((developer) => ({
    value: developer.username,
    label: developer.username,
  }));
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  return (
    <Dialog onClose={handleClose} open={open} className="taskcreateDialog">
      <div className="taskCreatewrapper">
        <div className="taskCreate">
          <span className="taskCreateTitle">Create Task</span>
          <form className="taskCreateForm">
            <div className="taskCreateLeft">
              <div className="taskCreateItem">
                <label>Task Name</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="taskCreateInput"
                />
              </div>
              <div className="taskCreateItem">
                <label>Task Description</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="taskCreateInput"
                />
              </div>
              <div className="taskCreateItem">
                <label>Due Date</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3} className="taskCreateInputdate">
                    <DesktopDatePicker
                      label="Date desktop"
                      inputFormat="MM/dd/yyyy"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
              <button className="taskCreateButton">Create</button>
            </div>
            <div className="taskCreateRight">
              <Select options={options} placeholder="Select Collaborator..." className="createtaskuserselector" />
              
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateTaskDialog;
