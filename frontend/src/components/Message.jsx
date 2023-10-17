import { Alert } from 'react-bootstrap';

const Message = ({ vaiant, children }) => {
  return <Alert variant={vaiant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};
export default Message;
