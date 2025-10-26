import React, { useState } from 'react';
import { ActionIcon } from '@lobehub/ui';
import { Plus, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { Button, Modal, Form, Input, theme } from 'antd';
import type { FormProps } from 'antd';
import { useModalStyles } from './styles/styles';

type FieldType = {
  ackName: string;
  ackDesc?: string;
};
const onFinish: FormProps<FieldType>['onFinish'] = values => {
  // TODO: Handle form submission
  // eslint-disable-next-line no-console
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
  // TODO: Handle form validation errors
  // eslint-disable-next-line no-console
  console.log('Failed:', errorInfo);
};

const { useToken } = theme;

const AckBaseHeader: React.FC = () => {
  const [isRight, setIsRight] = useState(false);
  const [isShowCreateAckModal, setIsShowCreateAckModal] = useState(false);
  const [form] = Form.useForm();
  const { styles: ModalStyle } = useModalStyles();

  const onCancel = () => {
    form.resetFields();
    setIsShowCreateAckModal(false);
  };
  const { token } = useToken();

  return (
    <div>
      <div className='ackHeader flex items-center  justify-between mx-2 my-2'>
        <div className='flex items-center gap-1'>
          <ActionIcon
            icon={isRight ? ChevronRight : ChevronDown}
            color='var(--color-darkTextColor)'
            onClick={() => setIsRight(!isRight)}
          ></ActionIcon>
          <span className='text-darkTextColor'>知识库</span>
        </div>
        <ActionIcon
          icon={Plus}
          color='var(--color-darkTextColor)'
          onClick={() => {
            setIsShowCreateAckModal(true);
          }}
        ></ActionIcon>
        <Modal
          title={
            <div className='flex items-center gap-2 mb-5'>
              <BookOpen size={18} />
              新建知识库
            </div>
          }
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isShowCreateAckModal}
          onCancel={onCancel}
          footer={null}
          className={ModalStyle.content}
        >
          <Form
            form={form}
            name='basic'
            layout='vertical'
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item<FieldType>
              label='知识库名称'
              name='ackName'
              rules={[{ required: true, message: '请输入知识库名称' }]}
              labelCol={{ style: { color: token.myTexthighlight } }}
            >
              <Input placeholder='知识库' />
            </Form.Item>
            <Form.Item<FieldType>
              label='知识库详情'
              name='ackDesc'
              rules={[{ required: false, message: '请输入知识库详情' }]}
            >
              <Input.TextArea rows={5} placeholder='知识库简介（选题）' />
            </Form.Item>
            <Button type='primary' block>
              新建
            </Button>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AckBaseHeader;
