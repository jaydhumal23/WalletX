import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
const { RangePicker } = DatePicker;
import axios from "axios";
import Analytics from "../components/Analytics";
const Homepage = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDate, setSelectedDate] = useState([]);
  const [viewState, setViewState] = useState("table");
  const [transaction, setTransaction] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [modalText, setModalText] = useState("");
  const [editable, setEditable] = useState(null)
  const [datas, setDatas] = useState("");
  const [startup, setStartup] = useState(false)
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount - ₹",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: ((text, record) => {
        return <div className="cursor-pointer text-xl">
          <EditOutlined onClick={() => {
            setEditable(record),
              form.setFieldValue({
                ...record
              })

            setShowModal(true)

          }} />
          <DeleteOutlined className="ml-4" onClick={() => handleDelete(record)} />
        </div>
      })
    },
  ];

  useEffect(() => {
    if (editable) {
      form.setFieldsValue({
        ...editable,
        date: editable.date ? moment(editable.date).format("YYYY-MM-DD") : undefined,
      });
    } else {
      form.resetFields();
    }
  }, [editable, form]);
  useEffect(() => {
    document.title = "WalletX - Home";

    logincheck();
    setStartup(true)
  }, [startup]);
  useEffect(() => {
    getAllTransaction(datas);
  }, [showModal, frequency, selectedDate, selectedType, viewState, editable, startup, datas]);

  async function getAllTransaction(id) {
    try {
      const { data } = await axios.post(
        "/api/v1/transactions/get-transactions",
        { userId: id, frequency, selectedDate, selectedType }
      );

      setTransaction(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function logincheck() {
    try {
      const { data } = await axios.get("/api/v1/users/logincheck");
      const detail = data.details._id;

      setDatas(detail);

      await getAllTransaction(detail);
    } catch (err) {
      console.log(err);
    }
  }
  const handleDelete = async (record) => {
    try {
      await axios.delete(`/api/v1/transactions/delete-transaction/${record._id}`)
      message.success("Transaction Deleted Successfully !!")
      await getAllTransaction(datas);

    } catch (error) {
      setConfirmLoading(false)
      console.log(error)
      message.error("unable to Delete")

    }

  }

  const handleOk = async (values) => {
    setModalText("");
    setConfirmLoading(true);

    setTimeout(async () => {
      try {
        if (editable) {
          await axios.put("/api/v1/transactions/edit-transaction", {
            payload: {
              ...values, userId: datas
            }, transactionId: editable._id
          })
          message.success("Transaction Updated Successfully !");
          form.resetFields();


        }
        else {
          await axios.post(
            "/api/v1/transactions/create-transaction",
            { ...values, userId: datas }
          );
          await getAllTransaction(datas);
          message.success("Transaction Created Successfully !");
        }
        setShowModal(false);
        setEditable(null);
        form.resetFields();
      } catch (error) {
        console.log(error);
        message.error("Transaction Creation Failed ! ");
      } finally {
        setConfirmLoading(false);
        setModalText("");
      }
    }, 800);
  };

  const handleFinishFailed = (errorInfo) => {
    console.log("here");
    console.log("Validation failed:", errorInfo);
    message.error("Please fill all required fields correctly.");
    setConfirmLoading(false);
    setModalText("");
  };
  return (
    <Layout>
      <div className="bg-gray-500/20 backdrop-blur-md mx-6 rounded-xl min-h-[80%] p-5 max-md:min-h-170 max-sm:text-[10px] max-sm:mx-1 max-sm:p-3">
        <div className="filters flex justify-between  items-center px-3 max-sm:px-0">
          <div className=" text-md flex  justify-center items-center gap-1 min-w-31 max-sm:min-w-31 ">
            <Select
              className="w-full"
              value={frequency}
              onChange={(values) => setFrequency(values)}
            >
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="180">Last 6 Months</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="730">Last 2 Years</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedDate(values)}
                className="w-full"
              />
            )}
          </div>
          <div className=" text-md flex  justify-center items-center gap-1 min-w-22 max-sm:text-[10px]">
            <Select
              className="w-full "
              value={selectedType}
              onChange={(values) => setSelectedType(values)}
            >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>
          <div className="flex justify-center items-center  gap-2 max-md:gap-2">
            <div className="flex justify-center items-center gap-2 px-2 py-1 bg-gray-100 rounded-md text-[18px]  cursor-pointer transition-all duration-30 max-sm:text-[15px]">
              <div className={`${viewState === "table" ? "text-black" : "text-gray-300"}`}>
                <UnorderedListOutlined onClick={() => setViewState("table")} />
              </div>
              <div className={`${viewState === "analytics" ? "text-black" : "text-gray-300"}`}>
                <AreaChartOutlined onClick={() => { setViewState("analytics"); setFrequency("365") }}
                /></div>

            </div>
            <h6
              className="text-white bg-blue-400 px-2 py-1 text-[18px] rounded-md cursor-pointer hover:bg-blue-500 transition-colors duration-30 max-sm:text-[15px]"
              onClick={() => {
                setEditable(null)
                setShowModal(true);
              }}
            >
              Add
            </h6>
          </div>
        </div>

        <div className="content mt-2 ">
          {viewState === "table" ? <Table columns={columns}
            dataSource={transaction}
            scroll={{ x: 'max-content' }}
            style={{
              backgroundColor: "rgba(249, 250, 251, 0.4)",
              backdropFilter: "blur(24px)",
              borderRadius: "12px",
              padding: "10px",


            }}
          /> : <Analytics transaction={transaction} />}

        </div>
      </div>
      <Modal
        style={{
          backgroundColor: "rgba(249, 250, 251, 0.4)",
          backdropFilter: "blur(24px)",
          borderRadius: "12px",
          padding: "10px",
        }}
        title={editable ? "Edit  Transaction" : "Add Transaction"}
        open={showModal}
        onOk={() => {
          form.submit();
        }}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setShowModal(false);
          form.resetFields();
        }}
        okText="Save"
      >
        <Form
          layout="vertical"
          onFinish={handleOk}
          onFinishFailed={handleFinishFailed}
          name="useForm"
          form={form}

        >
          <Form.Item
            label="Amount - ₹"
            name="amount"
            rules={[{ required: true, message: "Amount is Required" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[
              { required: true, message: "Type is Required", type: "string" },
            ]}
          >
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Category is Required",
                type: "string",
              },
            ]}
          >
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[
              { required: true, message: "Date is Required", type: "string" },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="Refrence"
            name="refrence"
            rules={[
              {
                required: true,
                message: "Refrence is Required",
                type: "string",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Description is Required",
                type: "string",
              },
              {
                min: 6,
                message: "Description must be at least 5 characters long!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
        </Form>
        <p>{modalText}</p>
      </Modal>
    </Layout>
  );
};

export default Homepage;
