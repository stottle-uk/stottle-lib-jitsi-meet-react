import React, { useRef } from 'react';
import { useJitsiPassword } from '../../../conference/hooks/useJitsiPassword';

interface OwnProps {
  joinConference: (username: string, password?: string) => void;
}

const LobbyForm: React.FC<OwnProps> = ({ joinConference }) => {
  const usernameEl = useRef<HTMLInputElement>(null);
  const passwordEl = useRef<HTMLInputElement>(null);
  const { passwordRequired } = useJitsiPassword();

  return (
    <div>
      <div className="form-field">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={usernameEl}
          autoComplete="false"
        />
      </div>
      {passwordRequired && (
        <div className="form-field">
          <label htmlFor="username">Enter Password:</label>
          <input
            type="password"
            id="password"
            ref={passwordEl}
            autoComplete="false"
          />
        </div>
      )}
      <div className="form-field">
        <button
          type="button"
          onClick={() =>
            joinConference(
              usernameEl.current?.value || 'NOT KNOWN',
              passwordEl.current?.value || 'NOT KNOWN'
            )
          }
        >
          JOIN
        </button>
      </div>
    </div>
  );
};

export default LobbyForm;
