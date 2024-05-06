import { Button, Form, Image, Input, Modal, Select, Table, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "./util/upload";
import { formatDistanceToNow } from "date-fns";

function PetShop() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const [dataSource, setDataSource] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form] = useForm();
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image} width={100} />,
    },
    {
      title: "Create at",
      dataIndex: "createAt",
      key: "createAt",
      render: (value) => (value ? formatDistanceToNow(new Date(value)) : "N/A"),
    },
  ];

  function handleOpenModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleOK() {
    form.submit();
  }

  async function handleSubmit(value) {
    console.log(value.image.file.originFileObj);
    const url = await uploadFile(value.image.file.originFileObj);
    value.image = url;
    value.createAt = new Date();
    axios.post("https://6628fc2a54afcabd0737b633.mockapi.io/Pet", value);
    setDataSource([...dataSource, value]);
    handleCloseModal();
    form.resetFields();
  }

  async function fetchPet() {
    const response = await axios.get(
      "https://6628fc2a54afcabd0737b633.mockapi.io/Pet"
    );
    setDataSource(response.data);
  }

  useEffect(() => {
    fetchPet();
  }, []);
  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Add new pet
      </Button>
      <Modal
        title="Add new pet"
        open={isOpen}
        onCancel={handleCloseModal}
        onOk={handleOK}
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Age" name="age">
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item label="Sex" name="sex">
            <Select
              options={[
                { value: "Male", label: <span>Male</span> },
                { value: "Female", label: <span>Female</span> },
              ]}
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Image" name="image">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default PetShop;
