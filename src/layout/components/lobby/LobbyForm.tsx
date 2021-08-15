import React, { FormEvent } from 'react';
import { useJitsiPassword } from '../../../conference/hooks/useJitsiPassword';

interface OwnProps {
  joinConference: (username: string, password?: string) => void;
}

const LobbyForm: React.FC<OwnProps> = ({ joinConference }) => {
  const { passwordRequired } = useJitsiPassword();

  const onClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usernameEl = e.currentTarget.elements.namedItem('username');
    const passwordEl = e.currentTarget.elements.namedItem('password');

    if (
      usernameEl instanceof HTMLInputElement &&
      passwordEl instanceof HTMLInputElement
    ) {
      joinConference(usernameEl.value || 'NOT KNOWN', passwordEl.value);
    } else if (usernameEl instanceof HTMLInputElement) {
      joinConference(usernameEl.value || 'NOT KNOWN');
    }
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
        </div>
      )}
      <div className="form-field">
        <button type="submit">JOIN</button>
      </div>
    </form>
  );
};

export default LobbyForm;
