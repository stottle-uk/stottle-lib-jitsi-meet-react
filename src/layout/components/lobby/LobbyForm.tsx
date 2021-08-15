import React, { FormEvent, useRef } from 'react';
import { useJitsiPassword } from '../../../conference/hooks/useJitsiPassword';

interface OwnProps {
  joinConference: (username: string, password?: string) => void;
}

const LobbyForm: React.FC<OwnProps> = ({ joinConference }) => {
  const usernameEl = useRef<HTMLInputElement>(null);
  const passwordEl = useRef<HTMLInputElement>(null);
  const { passwordRequired } = useJitsiPassword();

  const onClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinConference(
      usernameEl.current?.value || 'NOT KNOWN',
      passwordEl.current?.value || 'NOT KNOWN'
    );
  };

  return (
    <form autoComplete="off" noValidate onSubmit={onClick}>
      <div className="form-field">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" ref={usernameEl} />
      </div>
      {passwordRequired && (
        <div className="form-field">
          <label htmlFor="username">Enter Password:</label>
          <input type="password" id="password" ref={passwordEl} />
        </div>
      )}
      <div className="form-field">
        <button type="submit">JOIN</button>
      </div>
    </form>
  );
};

export default LobbyForm;
