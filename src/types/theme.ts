import 'antd/es/theme/interface';

declare module 'antd/es/theme/interface' {
  export interface AliasToken {
    // 在这里添加你的自定义令牌名称和类型
    myModalBgColor: string; // 例如：自定义一个字符串类型的令牌
    myInputBgColor: string;
    myInputBgHover: string;
    myInputBorder: string;
    myInputBorderFoucs: string;
    myButtonColor: string;
    myButtonColorHover: string;

    myTextColor: string;
    myTexthighlight: string;
    myTextDarkColor: string;
    MyCloseActiveColor: string;
  }
}
