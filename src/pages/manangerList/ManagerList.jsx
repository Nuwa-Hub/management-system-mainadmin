import "./managerList.css";
import { DataGrid } from "@mui/x-data-grid";
//import { userRows } from "../../dummyData";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteDeveloper, getmanagers } from "../../redux/apiCalls";
import userdp from "../../images/user.png";

export default function ManagerList() {
  const dispatch = useDispatch();
  const managers = useSelector((state) => state.developer.managers);

  useEffect(() => {
    getmanagers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteDeveloper(id,dispatch);
  };

  const columns = [
    { field: "fullname", headerName: "Full Name", width: 220 },

    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={ params.row.img || userdp}
              alt="user image"
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 180 },
    {
      field: "birthday",
      headerName: "Birthday",
      width: 180,
    },
    {
      field: "address",
      headerName: "Address",
      width: 180,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
           
            <DeleteIcon
              onClick={handleDelete.bind(this,params.row._id)}
              className="userListDelete"
            />
          
          </>
        );
      },
    },
  ];

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="userList">
          <DataGrid
            rows={managers}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={8}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
}
