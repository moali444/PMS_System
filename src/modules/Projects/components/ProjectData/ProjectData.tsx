import { Form } from "react-bootstrap";
import "./ProjectData.scss";
import Table from "react-bootstrap/Table";
import SortIcon from "./SortIcon";
const ProjectData = () => {
  return (
    <div id="project-data">
      <div className="form-background">
        <Form noValidate>
          <Form.Group className="search-input" controlId="">
            <i className="fa-solid fa-magnifying-glass"></i>
            <Form.Control type="email" placeholder="Search By Title" />
          </Form.Group>
        </Form>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              Title <SortIcon />
            </th>
            <th>
              Statues <SortIcon />
            </th>
            <th>
              Num Users <SortIcon />
            </th>
            <th>
              Num Tasks <SortIcon />
            </th>
            <th>
              Data Created <SortIcon />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@twitter</td>
            <td>@fat</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <div className="pagination"></div>
    </div>
  );
};

export default ProjectData;
