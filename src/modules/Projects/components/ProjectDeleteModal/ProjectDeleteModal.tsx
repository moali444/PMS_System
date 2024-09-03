import { useState } from "react";
import "./ProjectDeleteModal.scss";
import { Button, Modal } from "react-bootstrap";
import deletImg from "../../../../assets/images/delete.png";
import { BASE_HEADERS, PROJECTS_URLS } from "../../../../constants/END_POINTS";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

interface IProps {
  modalShow: boolean;
  setModalShow: () => void;
  selectedProjectId: number;
  getProject: () => void;
}

export default function ProjectDeleteModal({
  modalShow,
  setModalShow,
  selectedProjectId,
  getProject,
}: IProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await axios.delete(PROJECTS_URLS.deleteProject(selectedProjectId), {
        ...BASE_HEADERS,
      });
      getProject();
      setModalShow(false);
      toast.success("Item deleted successfully");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
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
            <h6>Delete This Project?</h6>
            <p>
              Are you sure you want to delete this item? If you are sure, just
              click on delete.
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer className="modal-footer border-0">
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <ClipLoader size={15} color={"#fff"} />
              </>
            ) : (
              "Delete It"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
