import FormWrapper from '../FormWrapper/FormWrapper';

type PhoneNumberData = {
    phoneNumber: string;
}

type PhoneNumberFormProps = PhoneNumberData & {
    updateFields: (fields: Partial<PhoneNumberData>)=> void;
}

export default function PhoneNumberForm({phoneNumber, updateFields}: PhoneNumberFormProps) {
  return (
    <FormWrapper title="Sign Up">
        <input
        autoFocus
        required
        type="tel"
        placeholder="Phone number (e.g., 123-456-7890)"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        minLength={6}
        value={phoneNumber}
        onChange={(e) => updateFields({ phoneNumber: e.currentTarget.value })}
        // onBlur={() => checkUsernameAvailability(username)}
      />
    </FormWrapper>
  )
}