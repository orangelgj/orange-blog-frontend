# Orange Blog Frontend

一个基于 Vue 3 的现代化个人博客前端项目，采用响应式设计，支持多主题切换，提供完整的博客功能体验。具体设计以及效果可以查看我在github主页放出的个人博客链接里的相关文章，请搭配后端一起使用，修改昵称图片等请直接使用 Claude Code、Codex、Cursor、Trae、Qoder等软件进行询问式修改
## 后端项目地址：https://github.com/orangelgj/orange-blog-backend

## 重要说明

### 页脚版权声明
本项目的页脚包含以下版权信息，**请勿删除或修改**：
- 开源协议声明：Open sourced under GPL v3
- 作者信息：Made with 🧡 橘子（链接到 GitHub）


这些信息是项目开源协议和作者身份的重要标识，保留这些信息是对开源协议和作者的尊重。
## 功能特性

### 核心功能
- **首页展示** - 精美的个人主页，展示博客介绍
- **文章浏览** - 文章列表、分类筛选、文章详情页
- **搜索功能** - 全文搜索文章内容
- **评论系统** - 支持发表评论、回复评论、删除评论
- **Markdown 渲染** - 支持 Markdown 格式的文章内容
- **代码高亮** - 使用 highlight.js 实现代码语法高亮

### 用户系统
- **用户注册** - 支持用户注册，包含邮箱验证
- **用户登录** - JWT Token 认证
- **个人资料** - 查看和修改个人信息
- **密码修改** - 安全的密码修改功能
- **用户名修改** - 支持修改用户名

### 管理功能
- **文章发布** - 管理员可发布新文章
- **权限管理** - 基于角色的访问控制

### 用户体验
- **主题切换** - 支持多种主题颜色，实时切换
- **响应式设计** - 完美适配桌面、平板、手机
- **暗色模式** - 支持暗色/亮色主题切换
- **平滑动画** - 流畅的页面过渡和交互效果

### 其他页面
- **关于页面** - 个人介绍
- **友情链接** - 展示友情链接
- **联系页面** - 联系方式展示

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **路由**: Vue Router 4
- **状态管理**: Pinia 3
- **HTTP 客户端**: Axios
- **Markdown 解析**: Marked
- **代码高亮**: Highlight.js
- **CSS**: 原生 CSS + CSS 变量

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览生产构建

```bash
npm run preview
```

## 后端接口文档

### 基础信息
- **Base URL**: `/api`
- **认证方式**: JWT Bearer Token + Cookie 认证（暗号系统）
- **Content-Type**: `application/json`

### 认证方式说明

#### 1. Cookie 认证（暗号系统）
- 用于注册和检查接口
- Cookie 名称和值需要通过搜索接口获取
- 获取方式：通过搜索接口输入正确的暗号获取 Cookie
- **⚠️ 重要**：关于暗号的值以及后续 Cookie 设置请自行根据后端代码替换，文档中的"暗号"只是占位符

#### 2. JWT Token 认证
- 用于需要登录的接口
- Token 在请求头中传递: `Authorization: Bearer {token}`
- Token 通过登录接口获取

### 公开接口

#### 1. 获取文章列表
```
GET /api/v1/articles
```

**查询参数**:
- `categoryId` (可选): 分类 ID，0 表示全部
- `page` (可选): 页码，默认 1
- `pageSize` (可选): 每页数量，默认 10

**响应示例**:
```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "title": "文章标题",
      "summary": "文章摘要",
      "content": "文章内容",
      "author": "作者",
      "date": "2026-03-29",
      "category": "分类名称"
    }
  ],
  "msg": "获取成功"
}
```

#### 2. 获取文章详情
```
GET /api/v1/article/:id
```

**路径参数**:
- `id`: 文章 ID

**响应示例**:
```json
{
  "code": 200,
  "data": {
    "id": 1,
    "title": "文章标题",
    "content": "文章内容",
    "author": "作者",
    "date": "2026-03-29",
    "category": "分类名称"
  },
  "msg": "查询成功"
}
```

#### 3. 获取分类列表
```
GET /api/v1/categories
```

**响应示例**:
```json
{
  "code": 200,
  "data": [
    {
      "id": 1,
      "name": "技术"
    }
  ],
  "msg": "获取成功"
}
```

#### 4. 搜索接口（暗号接口）
```
POST /api/v1/search
```

**⚠️ 重要说明**: 这是一个暗号接口，输入正确的暗号后会设置 Cookie，用于注册接口的权限验证

**请求体**:
```json
{
  "query": "暗号"
}
```

**响应示例（暗号正确）**:
```json
{
  "message": "成功啦"
}
```

**响应示例（暗号错误）**:
```json
{
  "message": "功能尚未开发"
}
```

**注意**: 文档中的"暗号"只是占位符，实际暗号需要查看后端代码获取。

#### 5. 检查认证状态
```
GET /api/v1/check
```

**⚠️ 重要说明**: 此接口用于验证 Cookie 是否有效，需要先通过搜索接口获取正确的 Cookie

**响应示例（认证成功）**:
```json
{
  "auth": true,
  "message": "成功啦"
}
```

**响应示例（认证失败）**:
```json
{
  "auth": false,
  "message": "嘻嘻嘻啦啦啦"
}
```

### 认证接口

#### 6. 用户登录
```
POST /api/v1/login
```

**请求体**:
```json
{
  "username": "用户名",
  "password": "密码"
}
```

**响应示例**:
```json
{
  "code": 200,
  "msg": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "用户名",
    "userId": 1,
    "role": 2
  }
}
```

**角色说明**:
- `role: 1` - 管理员
- `role: 2` - 普通用户

#### 7. 用户注册
```
POST /api/v1/register
```

**⚠️ 重要说明**: 需要先通过搜索接口获取正确的 Cookie，否则会返回 403 权限不足

**请求体**:
```json
{
  "username": "用户名",
  "password": "密码",
  "email": "邮箱",
  "description": "个人简介"
}
```

**响应示例**:
```json
{
  "code": 200,
  "msg": "欢迎你 用户名 呀！！！嘻嘻！"
}
```

**错误响应**:
```json
{
  "code": 403,
  "msg": "权限不足，无法注册"
}
```

### 需要认证的接口

以下接口需要在请求头中携带 JWT Token:

```
Authorization: Bearer {token}
```

#### 8. 获取根评论列表
```
GET /api/v1/comments
```

**查询参数**:
- `articleId` (必填): 文章 ID
- `pageNum` (可选): 页码，默认 1
- `pageSize` (可选): 每页数量，默认 10

**响应示例**:
```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 1,
      "content": "评论内容",
      "userId": 1,
      "userName": "用户名",
      "createTime": "2024-01-15T10:30:00Z",
      "likeCount": 10,
      "replyCount": 5,
      "ipLocation": "中国 北京",
      "previewReply": {
        "id": 10,
        "content": "回复内容",
        "userId": 2,
        "userName": "回复用户",
        "toUserId": 1,
        "toUserName": "被回复用户",
        "createTime": "2024-01-15T11:00:00Z",
        "likeCount": 2
      }
    }
  ],
  "total": 25
}
```

#### 9. 获取子评论列表
```
GET /api/v1/comments/replies
```

**查询参数**:
- `rootId` (必填): 根评论 ID
- `pageNum` (可选): 页码，默认 1
- `pageSize` (可选): 每页数量，默认 10

**响应示例**:
```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 10,
      "content": "回复内容",
      "userId": 2,
      "userName": "回复用户",
      "toUserId": 1,
      "toUserName": "被回复用户",
      "createTime": "2024-01-15T11:00:00Z",
      "likeCount": 2
    }
  ],
  "total": 5
}
```

#### 10. 发表评论
```
POST /api/v1/comments
```

**请求体**:
```json
{
  "articleId": 1,
  "content": "评论内容",
  "rootId": 0,
  "parentId": 0,
  "toUserId": 0
}
```

**参数说明**:
- `articleId`: 文章 ID（必填）
- `content`: 评论内容，最多 200 字（必填）
- `rootId`: 根评论 ID，发表根评论时为 0 或不传
- `parentId`: 父评论 ID，回复时可选
- `toUserId`: 被回复用户 ID，回复时可选

**响应示例**:
```json
{
  "code": 200,
  "msg": "评论发表成功",
  "data": {
    "id": 10,
    "content": "评论内容",
    "userId": 1,
    "userName": "用户名",
    "toUserId": 0,
    "toUserName": "",
    "createTime": "2026-03-18T10:30:00Z",
    "likeCount": 0,
    "ipLocation": "中国 北京"
  }
}
```

#### 11. 删除评论
```
DELETE /api/v1/comments/:id
```

**路径参数**:
- `id`: 评论 ID

**响应示例**:
```json
{
  "code": 200,
  "msg": "删除成功"
}
```

#### 12. 修改用户名
```
POST /api/v1/user/username
```

**请求体**:
```json
{
  "old_password": "旧密码",
  "new_username": "新用户名"
}
```

**响应示例**:
```json
{
  "code": 200,
  "msg": "用户名修改成功，请重新登录"
}
```

#### 13. 修改密码
```
POST /api/v1/user/password
```

**请求体**:
```json
{
  "old_password": "旧密码",
  "new_password": "新密码"
}
```

**响应示例**:
```json
{
  "code": 200,
  "msg": "密码修改成功，请重新登录"
}
```

### 管理员接口

以下接口需要 JWT Token 认证 + 管理员权限（role = 1）

#### 14. 创建文章
```
POST /api/v1/articles
```

**请求体**:
```json
{
  "title": "文章标题",
  "author": "作者",
  "category_id": 1,
  "summary": "文章摘要",
  "content": "文章内容"
}
```

**响应示例**:
```json
{
  "code": 200,
  "msg": "文章创建成功"
}
```

## 部署指南

### 1. 构建项目

```bash
npm run build
```

构建完成后，`dist` 目录包含所有静态文件。

### 2. Nginx 反向代理配置

创建 Nginx 配置文件 `/etc/nginx/sites-available/blog`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    location / {
        root /path/to/your/frontend/dist;
        try_files $uri $uri/ /index.html;
        index index.html;

        # 缓存静态资源
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # 后端 API 代理
    location /api/ {
        proxy_pass http://localhost:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;
}
```

启用配置:

```bash
sudo ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. HTTPS 配置（推荐）

使用 Let's Encrypt 免费证书:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

更新后的 Nginx 配置会自动包含 HTTPS 支持。

### 4. 环境变量配置

创建 `.env.production` 文件:

```env
VITE_API_BASE_URL=https://your-domain.com/api
```

修改 `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [vue()],
  base: '/',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
})
```

### 5. Docker 部署（可选）

创建 `Dockerfile`:

```dockerfile
# 构建阶段
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

创建 `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://backend:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

构建和运行:

```bash
docker build -t blog-frontend .
docker run -p 80:80 blog-frontend
```

### 6. 性能优化建议

#### 前端优化
- 启用 Gzip 压缩
- 配置 CDN 加速静态资源
- 使用懒加载和代码分割
- 优化图片大小和格式
- 启用浏览器缓存

#### Nginx 优化
```nginx
# 开启缓存
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g 
                 inactive=60m use_temp_path=off;

location /api/ {
    proxy_cache my_cache;
    proxy_cache_valid 200 60m;
    proxy_cache_bypass $http_cache_control;
    # ... 其他配置
}
```

### 7. 监控和日志

#### Nginx 访问日志
```nginx
access_log /var/log/nginx/blog_access.log;
error_log /var/log/nginx/blog_error.log;
```

#### 日志轮转
创建 `/etc/logrotate.d/nginx-blog`:

```
/var/log/nginx/blog_*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 `cat /var/run/nginx.pid`
    endscript
}
```

## 项目结构

```
frontend/
├── public/
│   ├── images/          # 静态图片资源
│   └── manifest.json    # PWA 配置
├── src/
│   ├── api/             # API 接口封装
│   │   ├── article.js
│   │   ├── auth.js
│   │   ├── comment.js
│   │   └── search.js
│   ├── components/      # 公共组件
│   │   ├── Footer.vue
│   │   ├── Header.vue
│   │   ├── MarkdownRenderer.vue
│   │   ├── SearchBox.vue
│   │   ├── ThemeSettings.vue
│   │   └── UserDropdown.vue
│   ├── composables/     # 组合式函数
│   │   ├── useSecretCode.js
│   │   └── useTheme.js
│   ├── router/          # 路由配置
│   │   └── index.js
│   ├── stores/          # Pinia 状态管理
│   │   └── user.js
│   ├── utils/           # 工具函数
│   │   ├── api.js       # Axios 实例配置
│   │   └── storage.js   # 本地存储封装
│   ├── views/           # 页面组件
│   │   ├── About.vue
│   │   ├── Admin.vue
│   │   ├── ArticleDetail.vue
│   │   ├── ArticleList.vue
│   │   ├── Contact.vue
│   │   ├── Forbidden.vue
│   │   ├── Home.vue
│   │   ├── Links.vue
│   │   ├── Login.vue
│   │   ├── NotFound.vue
│   │   ├── Profile.vue
│   │   ├── Publish.vue
│   │   └── Register.vue
│   ├── App.vue          # 根组件
│   ├── main.js          # 入口文件
│   └── style.css        # 全局样式
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

## 开发建议

### 代码规范
- 使用 ESLint 进行代码检查
- 遵循 Vue 3 Composition API 最佳实践
- 组件命名使用 PascalCase
- 文件命名使用 kebab-case

### 调试技巧
- 使用 Vue DevTools 进行调试
- 浏览器控制台查看网络请求
- 使用 Vite 的热更新功能

### 常见问题

**Q: 构建后页面空白？**
A: 检查 Nginx 配置中的 `try_files` 是否正确设置。

**Q: API 请求 404？**
A: 确认 Nginx 代理配置正确，后端服务正常运行。

**Q: 部署后主题不生效？**
A: 检查 CSS 文件是否正确加载，清除浏览器缓存。

**Q: 注册时提示权限不足？**
A: 需要先通过搜索接口输入正确的暗号获取 Cookie，才能进行注册。请查看后端代码获取实际暗号。

## 许可证

GPL v3

## 重要说明

### 页脚版权声明
本项目的页脚包含以下版权信息，**请勿删除或修改**：
- 开源协议声明：Open sourced under GPL v3
- 作者信息：Made with 🧡 橘子（链接到 GitHub）

这些信息是项目开源协议和作者身份的重要标识，保留这些信息是对开源协议和作者的尊重。

## 联系方式

- Email: orange2006cn@foxmail.com
- GitHub: github.com/orangelgj
