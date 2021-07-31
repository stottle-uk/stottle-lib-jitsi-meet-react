import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './CallButton.module.scss';

interface OwnProps {
  caption: string;
  logo: IconProp;
  className: string;
  onClick: () => void;
}

const CallButton: React.FC<OwnProps> = ({
  caption,
  className,
  logo,
  onClick
}) => (
  <div className={styles.button}>
    <button className={className} onClick={onClick} title={caption}>
      <FontAwesomeIcon icon={logo} size="2x" color="white" />
    </button>
  </div>
);

export default CallButton;
