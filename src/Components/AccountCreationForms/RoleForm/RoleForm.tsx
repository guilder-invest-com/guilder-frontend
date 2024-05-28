import FormWrapper from "../FormWrapper/FormWrapper";
import "./RoleForm.css";

type RoleData = {
  account_type: string;
};

type RoleFormProps = RoleData & {
  updateFields: (fields: Partial<RoleData>) => void;
  next: () => void;
};

export default function RoleForm({ updateFields, account_type, next }: RoleFormProps) {
  const handleRoleSelect = (newRole: string) => {
    if (account_type !==  newRole) {
      updateFields({ account_type: newRole });
    }
    next();
    console.log("Next called from roleform = ", newRole);
  };

  return (
    <FormWrapper>
      <div className="role-question">
        <p>Are you here to invest or to manage a portfolio?</p>
        <p>
          You can do both later, but let us know what you want to start with
        </p>
      </div>
      <div className="role-options">
        <hr />
        <div>
          <input
            readOnly
            required
            type="radio"
            id="invest"
            name="role"
            value="invest"
            className="role-radio"
            onClick={() => handleRoleSelect("invest")}
            checked={account_type === "invest"}
          ></input>
          <label htmlFor="invest" className="role-label">
            I want to invest
            <span>
              I want to find a great portfolio on Guilder that I can invest in
            </span>
          </label>
        </div>
        <hr />
        <div>
          <input
            readOnly
            type="radio"
            id="manager"
            name="role"
            value="manager"
            className="role-radio"
            onClick = {() => handleRoleSelect("manager")}
            checked={account_type === "manager"}
          ></input>
          <label htmlFor="manager" className="role-label">
            I want to create and manage a model portfolio
            <span>Get paid for managing a successful model portfolio</span>
          </label>
        </div>
      </div>
    </FormWrapper>
  );
}
