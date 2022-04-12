import React from 'react'


import { Modal, Form, Input } from 'antd'

function SenderNameModal({
    openSenderModal,
    savePseudoName,
    handleCancel,
    savePseudoNameFailed,
    isLoading
}) {


    const [form] = Form.useForm()

    return (
        <Modal
            title="Add pseudo name"
            visible={openSenderModal}
            onOk={form.submit}
            onCancel={handleCancel}
            okText="Save"
            confirmLoading={isLoading}
        >
            <div className="mb-3">
              <h3>
              Disclaimer ! 
             </h3> 
             <p>
                 To ensure your privacy, we do not display your name on public.
               So, please insert the name that you want to appear as the sender name
               for the producers.
             </p>
            </div>
            <Form
                name="basic"
                layout="vertical"
                initialValues={{}}
                form={form}
                onFinish={savePseudoName}
                onFinishFailed={savePseudoNameFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Pseudo Name"
                    name="pseudoName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input pseudo name',
                        },
                    ]}
                >
                    <Input type='text' placeholder='pseudo name' />
                </Form.Item>

            </Form>

        </Modal>
    )
}

export default SenderNameModal