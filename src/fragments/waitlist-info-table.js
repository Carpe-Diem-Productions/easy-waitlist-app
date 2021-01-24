import React from "react";

import Table from "react-bootstrap/Table";

const WaitlistInfoTable = (props) => {
  return (
    <Table responsive borderless hover striped>
      <tbody>
        <tr>
          <th>First name: </th>
          <td>{props.form.firstName}</td>
        </tr>
        <tr>
          <th>Last name: </th>
          <td>{props.form.lastName}</td>
        </tr>
        <tr>
          <th>Age: </th>
          <td>{props.form.age}</td>
        </tr>
        <tr>
          <th>Zip Code: </th>
          <td>{props.form.zip}</td>
        </tr>
        <tr>
          <th>Phone number: </th>
          <td>{props.form.phoneNumber}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default WaitlistInfoTable;
