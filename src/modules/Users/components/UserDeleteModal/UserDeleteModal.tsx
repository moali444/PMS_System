import "./UserDeleteModal.scss";
import { Button, Modal } from "react-bootstrap";
import deletImg from "../../../../assets/images/delete.png";
import { BASE_HEADERS, USERS_URLS } from "../../../../constants/END_POINTS";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface IProps {
  modalShow: boolean;
  setModalShow: () => void;
  selectedUserId: number;
  getProject: () => void;
}
export default function UserDeleteModal({
  modalShow,
  setModalShow,
  selectedUserId,
  getProject,
}: IProps) {
  const handelDelete = async () => {
    try {
      const response = await axios.delete(
        USERS_URLS.deleteUser(selectedUserId),
        {
          ...BASE_HEADERS,
        }
      );
      getProject();

      toast.success("Item deleted successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || "some thing wrong");
    }
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
        centered>
        <div className="d-flex justify-content-end mx-4 my-4">
          <button
            className="btn btn-model d-flex justify-content-center align-items-center"
            onClick={() => setModalShow(false)}>
            <i className="fa-solid fa-close"></i>
          </button>
        </div>

        <Modal.Body>
          <div className="w-100">
            <img src={deletImg} alt="delete-image" className="w-100" />
          </div>
          <div className="w-75 m-auto text-center">
            <h6>Delete This Project ?</h6>
            <p>
              Are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer className="modal-footer border-0">
          <Button variant="danger" onClick={handelDelete}>
            Delete It
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
