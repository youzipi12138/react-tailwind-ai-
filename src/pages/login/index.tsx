import React from 'react';
import { Form, Input, Button } from 'antd';
import type { FormProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useUserHooks } from '@/hooks/useUserHooks';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useUserHooks();

  const onFinish: FormProps<LoginFormValues>['onFinish'] = async values => {
    try {
      await login({ username: values.username, password: values.password });
      // 登录成功后跳转到主页
      navigate('/chat');
    } catch {
      // 错误已在 store 中处理，这里不需要额外处理
    }
  };

  const onFinishFailed: FormProps<LoginFormValues>['onFinishFailed'] =
    errorInfo => {
      // eslint-disable-next-line no-console
      console.log('表单验证失败:', errorInfo);
    };

  return (
    <div className='auth-page-enter bg-primary flex h-screen w-screen items-center justify-center'>
      <div className='auth-form-container bg-myModalBgColor w-full max-w-md rounded-lg p-8 shadow-lg'>
        <h1 className='text-myTexthighlight mb-6 text-center text-2xl font-bold'>
          登录
        </h1>
        <Form
          form={form}
          name='login'
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

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              block
              className='bg-myButtonColor text-myTextDarkColor hover:bg-myButtonColorHover'
            >
              登录
            </Button>
            <div className='text-myTextColor mt-3 text-center'>
              <span>需要新的账号？</span>
              <Link to='/register' className='text-mycolorlogo hover:underline'>
                注册
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
