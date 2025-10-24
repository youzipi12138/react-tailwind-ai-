# 开发指南

## 代码检查和格式化

本项目配置了完整的代码检查和格式化工具链，确保代码质量和一致性。

### 可用脚本

```bash
# 代码检查
npm run lint              # 运行ESLint检查
npm run lint:fix          # 自动修复ESLint问题

# 代码格式化
npm run format            # 使用Prettier格式化所有文件
npm run format:check      # 检查代码格式是否符合Prettier规范

# 类型检查
npm run type-check        # 运行TypeScript类型检查

# 综合检查
npm run check-all         # 运行所有检查（类型检查 + ESLint + 格式检查）
npm run fix-all          # 自动修复所有可修复的问题
```

### 工具配置

#### ESLint

- 配置文件：`eslint.config.js`
- 支持TypeScript、React、Prettier集成
- 自动修复：`npm run lint:fix`

#### Prettier

- 配置文件：`.prettierrc`
- 忽略文件：`.prettierignore`
- 自动格式化：`npm run format`

#### VSCode集成

- 配置文件：`.vscode/settings.json`
- 推荐扩展：`.vscode/extensions.json`
- 保存时自动格式化和修复

### 开发工作流

1. **开发前**：运行 `npm run check-all` 确保代码库状态良好
2. **开发中**：VSCode会自动格式化和修复代码
3. **提交前**：运行 `npm run fix-all` 自动修复所有问题
4. **CI/CD**：使用 `npm run check-all` 进行代码质量检查

### 规则说明

#### ESLint规则

- 使用TypeScript严格模式
- React Hooks规则
- 未使用变量检查（以`_`开头的变量忽略）
- 禁止使用`any`类型（警告）
- 控制台输出警告
- 禁止调试器语句

#### Prettier规则

- 使用单引号
- 行尾分号
- 2空格缩进
- 80字符行宽
- 箭头函数参数避免括号
- LF行尾符

### 故障排除

如果遇到ESLint或Prettier问题：

1. 检查配置文件是否正确
2. 运行 `npm run fix-all` 自动修复
3. 检查VSCode扩展是否正确安装
4. 重启VSCode和开发服务器
