import FormWrapper from "../FormWrapper/FormWrapper";

type LoginData = {
  email: string;
  password: string;
};

type LoginFormProps = LoginData & {
  updateFields: (fields: Partial<LoginData>) => void;
};

function LoginForm({ email, password, updateFields }: LoginFormProps) {
  return (
    <FormWrapper title="Login">
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
    </FormWrapper>
  );
}

export default LoginForm;
