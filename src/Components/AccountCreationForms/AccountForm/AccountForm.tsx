import FormWrapper from "../FormWrapper/FormWrapper";
import "./AccountForm.css";

type RegisterAccountData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  emailAvailable: boolean;
  usernameAvailable: boolean;
};

type AccountFormProps = RegisterAccountData & {
  updateFields: (fields: Partial<RegisterAccountData>) => void;
  checkEmailAvailability: (email: string) => Promise<void>;
  checkUsernameAvailability: (username: string) => Promise<void>;
};

export default function AccountForm({
  email,
  username,
  displayName,
  password,
  confirmPassword,
  updateFields,
  checkEmailAvailability,
  checkUsernameAvailability,
  emailAvailable,
  usernameAvailable,
}: AccountFormProps) {
  return (
    <FormWrapper title="Signup">
      <input
        autoFocus
        required
        placeholder="Email"
        value={email}
        onChange={(e) => updateFields({ email: e.currentTarget.value })}
        onBlur={() => checkEmailAvailability(email)}
      />
      {!emailAvailable && (
        <div className="login-field-error">Email already exists</div>
      )}
      <input
        required
        type="text"
        placeholder="Username"
        minLength={6}
        value={username}
        onChange={(e) => updateFields({ username: e.currentTarget.value })}
        onBlur={() => checkUsernameAvailability(username)}
      />
      {!usernameAvailable && (
        <div className="login-field-error">Username already exists</div>
      )}
      <input
        required
        type="text"
        placeholder="Display Name"
        minLength={3}
        value={displayName}
        onChange={(e) => updateFields({ displayName: e.currentTarget.value })}
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
