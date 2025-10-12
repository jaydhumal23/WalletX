import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { Modal, Form, Input, Select, message, Table, DatePicker } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from "moment"
const Homepage = () => {
  const [showModal, setShowModal] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [form] = Form.useForm();
  const [datas, setDatas] = useState("")
  const [transaction, setTransaction] = useState([])
  const navigate = useNavigate();
  const [frequency, setFrequency] = useState("7")
  const { RangePicker } = DatePicker;
  const columns = [
    {
      "title": "Date",
      "dataIndex": "date",
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,

    },
    {
      "title": "Amount - ₹",
      "dataIndex": "amount"
    },
    {
      "title": "Type",
      "dataIndex": "type"
    },
    {
      "title": "Category",
      "dataIndex": "category"
    },
    {
      "title": "Refrence",
      "dataIndex": "refrence"
    },
    {
      "title": "Actions"
    }
  ]
  useEffect(() => {
    document.title = "Home";

    logincheck()




  }, []);
  useEffect(() => {
    getAllTransaction(datas)
  }, [showModal, frequency])

  async function getAllTransaction(id) {
    try {
      const { data } = await axios.post("/api/v1/transactions/get-transactions", { userId: id, frequency })
      console.log(data)
      setTransaction(data)
    } catch (error) {
      console.log(error)
    }
  }
  async function logincheck() {
    try {
      const { data } = await axios.get("/api/v1/users/logincheck");
      const detail = data.details._id;

      setDatas(detail)
      console.log(detail)
      await getAllTransaction(detail);

    } catch (err) {
      console.log(err)
    }

  }



  const handleOk = async (values) => {
    setModalText('Saving......');
    setConfirmLoading(true);

    setTimeout(async () => {





      try {
        console.log(datas)
        const create = await axios.post("/api/v1/transactions/create-transaction", { ...values, userId: datas });
        await getAllTransaction(datas)
        message.success("Transaction Created Successfully !")
        setShowModal(false);
        form.resetFields()


      } catch (error) {
        console.log(error);
        message.error("Transaction Creation Failed ! ")
      } finally {
        setConfirmLoading(false);
        setModalText('');
      }

    }, 800);




  };

  const handleFinishFailed = (errorInfo) => {
    console.log('here')
    console.log("Validation failed:", errorInfo);
    message.error("Please fill all required fields correctly.");
    setConfirmLoading(false);
    setModalText('');
  };
  return (
    <Layout>
      <div className='bg-gray-100/20 backdrop-blur-xl mx-6 rounded-xl min-h-[80%] p-5'>
        <div className="filters flex justify-between  items-center px-3" >
          <div className=' text-md flex flex-col justify-center items-center'>

            <Select className='w-full' value={frequency} onChange={(values) => setFrequency(values)}>
              <Select.Option value="7" >Last 1 Week</Select.Option>
              <Select.Option value="30" >Last 1 Month</Select.Option>
              <Select.Option value="180" >Last 6 Months</Select.Option>
              <Select.Option value="365" >Last 1 Year</Select.Option>
              <Select.Option value="730" >Last 2 Years</Select.Option>
              <Select.Option value="custom" >Custom</Select.Option>
            </Select>
          </div>
          <div><h6 className='text-white bg-blue-400 px-2 py-1 rounded-md cursor-pointer hover:bg-blue-500 transition-colors duration-30' onClick={() => { setShowModal(true) }}>Add New</h6></div>
        </div>

        <div className="content mt-2">
          <Table columns={columns} dataSource={transaction}
            style={{

              backgroundColor: 'rgba(243, 244, 246, 0.3)',
              backdropFilter: 'blur(12px)',
              borderRadius: '12px',
              padding: '10px',
            }} />
        </div>
      </div>
      <Modal
        style={{
          backgroundColor: 'rgba(243, 244, 246, 0.3)',
          backdropFilter: 'blur(12px)',
          borderRadius: '12px',
          padding: '10px',
        }}
        title="Add Transaction"
        open={showModal}
        onOk={() => { form.submit() }}
        confirmLoading={confirmLoading}
        onCancel={() => { setShowModal(false); form.resetFields() }}
        okText="Save"

      >
        <Form layout="vertical"
          onFinish={handleOk}
          onFinishFailed={handleFinishFailed}
          name='useForm'
          form={form}

        >
          <Form.Item label="Amount - ₹" name="amount" rules={[{ required: true, message: "Amount is Required" }]}>
            <Input type='number' />
          </Form.Item  >
          <Form.Item label="Type" name="type" rules={[{ required: true, message: "Type is Required", type: "string" }]}
          >
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: "Category is Required", type: "string" }]}>
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
          <Form.Item label="Date" name="date" rules={[{ required: true, message: "Date is Required", type: "string" }]} >
            <Input type='date' />
          </Form.Item>
          <Form.Item label="Refrence" name="refrence" rules={[{ required: true, message: "Refrence is Required", type: "string" }]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: "Description is Required", type: "string" }, { min: 6, message: "Description must be at least 5 characters long!" }]}>
            <Input type='text' />
          </Form.Item>
        </Form>
        <p>{modalText}</p>

      </Modal>
    </Layout>
  )
}

export default Homepage