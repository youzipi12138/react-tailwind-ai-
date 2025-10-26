import { createStyles } from 'antd-style';

const useModalStyles = createStyles(({ css, token, prefixCls }) => {
  return {
    content: css`
      .${prefixCls}-modal-content {
        background: ${token.myModalBgColor};
        border-radius: 10px;
      }

      .${prefixCls}-modal-header {
        background: ${token.myModalBgColor};
        color:${token.myTexthighlight}
        padding: 16px 24px;
      }

      .${prefixCls}-modal-body {
        background: ${token.myModalBgColor};
        padding: 24px;
      }

      .${prefixCls}-modal-title {
        color: ${token.myTexthighlight};
        font-weight: 600;
        font-size: 16px;
      }

      .${prefixCls}-modal-close {
        color: ${token.myTextColor};

        &:hover {
          color: ${token.myTexthighlight};
          background-color:${token.MyCloseActiveColor}
          
        }
        &:active{
          background-color:${token.MyCloseActiveColor}
        }
      }

      // Form.Item label 样式
      .${prefixCls}-form-item-label > label {
        color: ${token.myTexthighlight};
      }


      // 若需匹配 outlined 变体（如 .ant-input-outlined）
      .${prefixCls}-input-outlined {
        color:${token.myTexthighlight};
        border-color: ${token.myInputBgColor}; // 自定义边框色
        background: ${token.myInputBgColor}; // 自定义背景色
        &::placeholder {
          color: ${token.myTextColor}; // 自定义占位符颜色 token
          opacity: 1; // 确保透明度为 1（部分浏览器默认有透明度）
        }
        &:focus {
          border-color: ${token.myInputBorderFoucs};
        }

      }
      // 错误状态的 outlined 变体 Input（精准匹配目标选择器）
      .${prefixCls}-input-outlined.${prefixCls}-input-status-error:not(.${prefixCls}-input-disabled) {
        border-color: red ; // 覆盖错误边框色
        background: ${token.myInputBgColor} ; // 确保背景色不被覆盖
        color: ${token.myTexthighlight} ; // 错误状态下的文字颜色

        // 错误状态下的 placeholder 样式
        &::placeholder {
          color: ${token.myTextColor} ;
          opacity: 1;
        }

        // 错误状态下的聚焦样式
        &:focus {
          box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2) ;
        }
      }
      .${prefixCls}-btn{
        color:${token.myTextDarkColor};
        background: ${token.myButtonColor};
        &:hover{
          color:${token.myTextDarkColor} !important;
          background: ${token.myButtonColorHover} !important;
        }
      }

    `,
  };
});

export { useModalStyles };
