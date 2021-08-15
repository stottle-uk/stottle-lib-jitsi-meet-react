import React, { FormEvent } from 'react';
import { useJitsiPassword } from '../../../conference/hooks/useJitsiPassword';

interface OwnProps {
  joinConference: (username: string, password?: string) => void;
}

const LobbyForm: React.FC<OwnProps> = ({ joinConference }) => {
  const { passwordRequired, attempts } = useJitsiPassword();

  const onClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [usernameEl, passwordEl] = ['username', 'password'].map(
      c => e.currentTarget.elements.namedItem(c) as HTMLInputElement
    );

    joinConference(usernameEl.value || 'NOT KNOWN', passwordEl?.value);
  };

  return (
    <form autoComplete="off" noValidate onSubmit={onClick}>
      <div className="form-field">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
      </div>
      {passwordRequired && (
        <div className="form-field">
          <label htmlFor="password">Enter Password:</label>
          <input type="password" id="password" name="password" />
          {attempts > 1 && (
            <div className="form-error">
              Password Incorrect, please try again
            </div>
          )}
        </div>
      )}
      <div className="form-field">
        <button type="submit">JOIN</button>
      </div>
    </form>
  );
};

export default LobbyForm;
