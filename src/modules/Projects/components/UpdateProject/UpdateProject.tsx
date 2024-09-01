import React from "react";
import UpdateFormProject from "./UpdateFormProject";
import AuthAddProject from "../../../Shared/components/AuthAddProject/AuthAddProject";
export default function UpdateProject () {
  return (
    <>
      <AuthAddProject
        title_text=" update a project "
        content={<UpdateFormProject/>}
      />
    </>
  );
}
