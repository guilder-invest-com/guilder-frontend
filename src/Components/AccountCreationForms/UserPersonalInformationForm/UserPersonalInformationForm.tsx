import FormWrapper from "../FormWrapper/FormWrapper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./UserPersonalInformationForm.css"

type UserPersonalInformationData = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
};

type userPersonalInformationProps = UserPersonalInformationData & {
  updateFields: (fields: Partial<UserPersonalInformationData>) => void;
};
export default function UserPersonalInformationForm({
  firstName,
  lastName,
  dateOfBirth,
  updateFields,
}: userPersonalInformationProps) {
  return (
    <FormWrapper title="Sign Up">
      <input
        autoFocus
        required
        placeholder="First Name"
        minLength={2}
        value={firstName}
        onChange={(e) => updateFields({ firstName: e.currentTarget.value })}
      />
      <input
        required
        type="text"
        placeholder="Last Name"
        minLength={2}
        value={lastName}
        onChange={(e) => updateFields({ lastName: e.currentTarget.value })}
      />
      <DatePicker
        placeholderText="Date of Birth (MM/DD/YYYY)"
        required
        showIcon
        selected={dateOfBirth}
        onChange={(date: Date | null) => updateFields({ dateOfBirth: date })}
      />
    </FormWrapper>
  );
}
