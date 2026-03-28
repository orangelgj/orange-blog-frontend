# 静态资源使用说明

## 目录结构

```
frontend/
├── public/              # 静态资源目录
│   └── images/         # 图片资源
│       └── avatar.jpg  # 头像图片
├── src/
│   └── views/
│       └── About.vue   # 使用头像的页面
```

## 如何添加头像

### 1. 准备头像图片
- 将你的头像图片命名为 `avatar.jpg` 或 `avatar.png`
- 建议尺寸：200x200 像素或更大
- 建议格式：JPG、PNG、WebP

### 2. 放置图片
将头像图片复制到：
```
frontend/public/images/avatar.jpg
```

### 3. 配置头像路径
在 `src/views/About.vue` 文件中修改头像路径：

```javascript
const avatarUrl = ref('/images/avatar.jpg')
```

## 其他静态资源

### 图片资源
所有图片都放在 `public/images/` 目录下：
```
public/images/
├── avatar.jpg       # 头像
├── banner.jpg       # 横幅
├── logo.png        # Logo
└── article/        # 文章图片
    └── cover.jpg
```

### 使用方式
在 Vue 组件中引用：
```vue
<template>
  <img src="/images/avatar.jpg" alt="头像" />
  <!-- 或者使用动态绑定 -->
  <img :src="imageUrl" alt="图片" />
</template>

<script setup>
import { ref } from 'vue'

const imageUrl = ref('/images/avatar.jpg')
</script>
```

## 注意事项

1. **路径前缀**：`public` 目录下的资源在开发环境中直接通过 `/` 访问，不需要 `public` 前缀
   - 正确：`/images/avatar.jpg`
   - 错误：`/public/images/avatar.jpg`

2. **文件名**：建议使用小写字母和连字符，如 `my-avatar.jpg`

3. **图片优化**：
   - 头像建议使用正方形图片
   - 使用适当的图片格式和压缩
   - 考虑使用 WebP 格式以获得更好的压缩率

4. **构建后**：`public` 目录下的所有文件会被原封不动地复制到构建输出目录

## 示例

### 添加文章封面图
1. 将图片放到 `public/images/article-cover.jpg`
2. 在组件中使用：
```javascript
const coverImage = ref('/images/article-cover.jpg')
```

### 添加 Logo
1. 将图片放到 `public/images/logo.png`
2. 在 Header 组件中使用：
```vue
<div class="logo">
  <img src="/images/logo.png" alt="Orange" />
</div>
```
