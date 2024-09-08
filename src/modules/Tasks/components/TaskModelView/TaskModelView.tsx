import { useState } from "react";
import "./TaskModelView.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import taskImg from "../../../../assets/images/task.jpg";
// import { BASE_IMG_URL } from "../../../../constants/END_POINTS";

interface TaskModelViewProps {
  task: {
    title: string;
    description: string;
    status: string;
    creationDate: string;
    project: {
      title: string;
      manager: {
        userName: string;
      };
    };

    employee: {
      userName: string;
    } | null;
  };
}

export default function TaskModelView({ task }: TaskModelViewProps) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        className="dropdown-item w-100"
        onClick={() => setModalShow(true)}
      >
        <i className="fa-regular fa-eye me-2" aria-hidden="true"></i> View
      </button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="d-flex justify-content-end mx-4 my-4">
          <button
            className="btn btn-model d-flex justify-content-center align-items-center"
            onClick={() => setModalShow(false)}
          >
            <i className="fa-solid fa-close"></i>
          </button>
        </div>

        <Modal.Body>
          <div className="container">
            <div className="row g-6">
              <div className="col-md-5 image-section d-flex justify-content-center align-items-center">
                <div className="img-container">
                  <img src={taskImg} className="w-100 " />
                </div>
              </div>
              <div className="col-md-7 ps-3">
                <ul className="list-unstyled info-list">
                  <li>
                    <strong>Title:</strong> {task.title}
                  </li>
                  <li>
                    <strong>Description:</strong> {task.description}
                  </li>
                  <li>
                    <strong>Status:</strong> {task.status}
                  </li>
                  <li>
                    <strong>Project:</strong> {task.project.title}
                  </li>
                  <li>
                    <strong>Creation Date:</strong>{" "}
                    {new Date(task.creationDate).toLocaleDateString()}
                  </li>
                  {task.project.manager.userName && (
                    <>
                      <li>
                        <strong>Manager:</strong>{" "}
                        {task.project.manager.userName}
                      </li>
                    </>
                  )}
                  {task.employee && (
                    <>
                      <li>
                        <strong>Assigned Employee:</strong>{" "}
                        {task.employee.userName}
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="modal-footer border-0">
          <Button variant="danger" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
