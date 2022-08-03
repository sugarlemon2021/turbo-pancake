import { FC } from 'react';
import MuiButton, { ButtonProps } from '@material-ui/core/Button';

type Props = ButtonProps & {
  lg?: boolean;
  primary?: boolean;
};

const Button: FC<Props> = ({ lg, primary, ...props }) => {
  const customProps: ButtonProps = {};

  customProps.color = primary ? 'primary' : undefined;
  customProps.size = lg ? 'large' : undefined;

  return <MuiButton {...props} {...customProps} />;
};

export default Button;
