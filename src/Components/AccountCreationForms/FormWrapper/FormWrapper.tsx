import { ReactNode } from "react";
import "./FormWrapper.css";

type FormWrapperProps = {
  title?: string;
  children: ReactNode;
};

function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      {title && <h4>{title}</h4>}
      <div className="form-contents">{children}</div>
    </>
  );
}

export default FormWrapper;
