import { Button, Modal } from "antd";

const Info = ({ name, active, setActive, link }) => {
  return (
    <Modal
      title={name}
      closable={{ "aria-label": "Custom Close Button" }}
      open={active}
      onCancel={() => setActive(false)}
      onOk={() => setActive(false)}
      style={{ top: "50%", left: "4.6%" }}
      footer={[
        <Button key="back" onClick={() => setActive(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => setActive(false)}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            Go to {name}
          </a>
        </Button>,
      ]}
    >
      <p>Some contents...</p>
    </Modal>
  );
};

export default Info;
