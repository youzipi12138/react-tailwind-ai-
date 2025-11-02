import React from 'react';
import { Form, Input, Button } from 'antd';
import type { FormProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useUserHooks } from '@/hooks/useUserHooks';

interface RegisterFormValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { register } = useUserHooks();

  const onFinish: FormProps<RegisterFormValues>['onFinish'] = async values => {
    try {
      await register({ username: values.username, password: values.password });
      // 注册成功后跳转到登录页
      navigate('/login');
    } catch {
      // 错误已在 store 中处理，这里不需要额外处理
    }
  };

  const onFinishFailed: FormProps<RegisterFormValues>['onFinishFailed'] =
    errorInfo => {
      // eslint-disable-next-line no-console
      console.log('表单验证失败:', errorInfo);
    };

  return (
    <div className='auth-page-enter bg-primary flex h-screen w-screen items-center justify-center'>
      <div className='auth-form-container bg-myModalBgColor w-full max-w-md rounded-lg p-8 shadow-lg'>
        <h1 className='text-myTexthighlight mb-6 text-center text-2xl font-bold'>
          注册
        </h1>
        <Form
          form={form}
          name='register'
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label={<span className='text-myTexthighlight'>用户名</span>}
            name='username'
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: '用户名只能包含字母、数字和下划线',
              },
            ]}
          >
            <Input
              size='large'
              placeholder='请输入用户名'
              className='bg-myInputBgColor border-myInputBorder text-myTexthighlight hover:border-myInputBorderFoucs focus:border-myInputBorderFoucs'
            />
          </Form.Item>

          <Form.Item
            label={<span className='text-myTexthighlight'>密码</span>}
            name='password'
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6个字符' },
            ]}
          >
            <Input.Password
              size='large'
              placeholder='请输入密码'
              className='bg-myInputBgColor border-myInputBorder text-myTexthighlight hover:border-myInputBorderFoucs focus:border-myInputBorderFoucs'
            />
          </Form.Item>

          <Form.Item
            label={<span className='text-myTexthighlight'>确认密码</span>}
            name='confirmPassword'
            dependencies={['password']}
            rules={[
              { required: true, message: '请再次输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password
              size='large'
              placeholder='请再次输入密码'
              className='bg-myInputBgColor border-myInputBorder text-myTexthighlight hover:border-myInputBorderFoucs focus:border-myInputBorderFoucs'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              block
              className='bg-myButtonColor text-myTextDarkColor hover:bg-myButtonColorHover'
            >
              注册
            </Button>
            <div className='text-myTextColor mt-3 text-center'>
              <span>已有账号？</span>
              <Link to='/login' className='text-mycolorlogo hover:underline'>
                登录
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
