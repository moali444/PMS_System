import { useState } from "react";
import "./TaskDeleteModel.scss";
import { Button, Modal } from "react-bootstrap";
import deletImg from "../../../../assets/images/delete.png";

interface IProps {
  deleteTask: () => void;
}
export default function TaskDeleteModel({ deleteTask }: IProps) {
  const [modalShow, setModalShow] = useState(false);
  console.log(deleteTask);

  const hadelDelete = () => {
    deleteTask();
    setModalShow(false);
  };

  return (
    <>
      <button className="dropdown-item" onClick={() => setModalShow(true)}>
        <i className="fa-solid fa-trash me-2" aria-hidden="true"></i> Delete
      </button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="md"
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
          <div className="w-100">
            <img src={deletImg} alt="delete-image" className="w-100" />
          </div>
          <div className="w-75 m-auto text-center">
            <h6>Delete This Task ?</h6>
            <p>
              Are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer className="modal-footer border-0">
          <Button variant="danger" onClick={hadelDelete}>
            Delete It
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
