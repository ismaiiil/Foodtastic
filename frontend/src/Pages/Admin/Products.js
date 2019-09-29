import React from "react";
import MaterialTable from "material-table";

const ManageProducts = () => {
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Avatar",
        field: "imageUrl",
        render: rowData => (
          <img
            src={rowData.imageUrl}
            style={{ width: 40, borderRadius: "50%" }}
          />
        )
      },
      { title: "Name", field: "name" },
      { title: "Surname", field: "surname" },
      { title: "Birth Year", field: "birthYear", type: "numeric" },
      {
        title: "Birth Place",
        field: "birthCity",
        lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
      }
    ],
    data: [
      {
        name: "Mehmet",
        surname: "Baran",
        birthYear: 1987,
        birthCity: 63,
        imageUrl: "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4"
      },
      {
        name: "Zerya Betül",
        surname: "Baran",
        birthYear: 2017,
        birthCity: 34,
        imageUrl: "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4"
      }
    ]
  });

  return (
    <MaterialTable
      title="Manage Products"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          })
      }}
    />
  );
};

export default ManageProducts;
