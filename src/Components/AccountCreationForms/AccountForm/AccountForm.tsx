import FormWrapper from "../FormWrapper/FormWrapper";
import "./AccountForm.css";

type AccountData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type AccountFormProps = AccountData & {
  updateFields: (fields: Partial<AccountData>) => void;
};

export default function AccountForm({
  email,
  password,
  confirmPassword,
  updateFields,
}: AccountFormProps) {
  return (
    <FormWrapper title="Signup">
      <input
        autoFocus
        required
        placeholder="Email"
        value={email}
        onChange={(e) => updateFields({ email: e.currentTarget.value })}
      />
      <input
        required
        type="password"
        placeholder="Password"
        minLength={8}
        value={password}
        onChange={(e) => updateFields({ password: e.currentTarget.value })}
      />
      <input
        required
        type="password"
        placeholder="Confirm Password"
        minLength={8}
        value={confirmPassword}
        onChange={(e) =>
          updateFields({ confirmPassword: e.currentTarget.value })
        }
      />
    </FormWrapper>
  );
}
