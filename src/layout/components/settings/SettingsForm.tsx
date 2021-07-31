import React, { useRef } from 'react';

interface OwnProps {
  subitPassword: (passwod: string) => void;
}

const SettingsForm: React.FC<OwnProps> = ({ subitPassword }) => {
  const passwordEl = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" ref={passwordEl} />
      </div>
      <div className="form-field">
        <button
          onClick={() =>
            passwordEl.current?.value &&
            subitPassword(passwordEl.current?.value)
          }
        >
          Set Password
        </button>
      </div>
    </div>
  );
};

export default SettingsForm;
