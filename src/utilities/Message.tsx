import React from "react";
import { Alert } from "react-bootstrap";
interface ChildProps {
  variant: string;
  children: React.ReactNode;
}
const Message: React.FC<ChildProps> = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};
Message.defaultProps = { variant: "info" };

export default Message;
