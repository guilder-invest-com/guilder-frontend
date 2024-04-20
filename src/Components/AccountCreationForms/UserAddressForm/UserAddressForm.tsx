import Select from "react-select";

import { allStates } from "../../../Data/ResidenceData";
import FormWrapper from "../FormWrapper/FormWrapper";
type UserAddressData = {
  address: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
};

type UserAddressProps = UserAddressData & {
  updateFields: (fields: Partial<UserAddressData>) => void;
};

const stateOptions = allStates.map((state) => ({
  value: state,
  label: state,
}));

type OptionType = {
  value: string;
  label: string;
};

const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "1px solid #8F8F8F",
    borderRadius: "3px",
    minHeight: "24px",
    padding: "0",
    boxShadow: "none",
    "&:hover": { borderColor: "#8F8F8F" },
  }),
  input: (provided: any) => ({
    ...provided,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: ".75rem",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: ".75rem",

  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: ".75rem",
  }),
  option: (provided: any) => ({
    ...provided,
    fontSize: ".75rem",
  }),
};

export default function UserAddressForm({
  address,
  address2,
  city,
  state,
  zipcode,
  updateFields,
}: UserAddressProps) {
  const handleSelectChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      updateFields({ state: selectedOption.value });
    }
  };
  return (
    <FormWrapper title="Sign up">
      <input
        autoFocus
        required
        placeholder="Address"
        value={address}
        onChange={(e) => updateFields({ address: e.currentTarget.value })}
      />
      <input
        placeholder="Apartment, suite..."
        value={address2}
        onChange={(e) => updateFields({ address2: e.currentTarget.value })}
      />
      <input
        required
        placeholder="City"
        value={city}
        onChange={(e) => updateFields({ city: e.currentTarget.value })}
      />
      <Select
        required
        value={stateOptions.find((option) => option.value === state) || null}
        // value={stateOptions.find((option) => option.value === state)}
        onChange={handleSelectChange}
        options={stateOptions}
        placeholder="State"
        className="react-select-container"
        classNamePrefix="react-select"
        styles={customSelectStyles}
      />
      <input
        required
        placeholder="Zip Code"
        value={zipcode}
        onChange={(e) => updateFields({ zipcode: e.currentTarget.value })}
      />
    </FormWrapper>
  );
}
