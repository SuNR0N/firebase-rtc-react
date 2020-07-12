import React, { createElement, FC } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { IconType } from 'react-icons';

import './icon-button.scss';

interface IconButtonProps extends ButtonProps {
  iconType: IconType;
  label: string;
}

export const IconButton: FC<IconButtonProps> = ({ iconType, label, ...props }) => (
  <Button className="grIconButton" {...props}>
    <span className="grIconButton__icon">{createElement(iconType)}</span>
    <span className="grIconButton__label">{label}</span>
  </Button>
);
