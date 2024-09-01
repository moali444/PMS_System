import React, { useEffect } from "react";
import AddFormProject from "./AddFormProject";
import AuthAddProject from "../../../Shared/components/AuthAddProject/AuthAddProject";
export default function AddProject() {

  return (
    <>
      <AuthAddProject
        title_text=" Add a New Project"
        content={<AddFormProject />}
      />
    </>
  );
}
