import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface OwnProps extends React.HTMLAttributes<HTMLButtonElement> {
  logo: IconProp;
  color?: string;
}

const CallButton: React.FC<OwnProps> = ({ logo, color, ...props }) => (
  <button {...props}>
    <FontAwesomeIcon icon={logo} size="2x" color={color || 'white'} />
  </button>
);

export default CallButton;
