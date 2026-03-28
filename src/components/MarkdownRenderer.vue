<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<script setup>
import { computed, onMounted, nextTick } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true
})

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const renderedContent = computed(() => {
  if (!props.content) return ''
  return marked(props.content)
})

onMounted(() => {
  nextTick(() => {
    highlightAllCode()
  })
})

function highlightAllCode() {
  const codeBlocks = document.querySelectorAll('.markdown-content pre code')
  codeBlocks.forEach((block) => {
    const code = block.textContent
    const pre = block.parentElement
    
    if (pre.classList.contains('hljs')) {
      return
    }
    
    const result = hljs.highlightAuto(code)
    pre.classList.add('hljs')
    block.className = `hljs language-${result.language || 'plaintext'}`
    block.innerHTML = result.value
  })
}
</script>

<style>
.markdown-content {
  line-height: 1.8;
  color: #1d1d1f;
  word-wrap: break-word;
}

.markdown-content h1 {
  font-size: 2em;
  font-weight: 700;
  margin: 1.5em 0 0.5em 0;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #e5e5e5;
}

.markdown-content h2 {
  font-size: 1.5em;
  font-weight: 600;
  margin: 1.5em 0 0.5em 0;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #f5f5f5;
}

.markdown-content h3 {
  font-size: 1.25em;
  font-weight: 600;
  margin: 1.5em 0 0.5em 0;
}

.markdown-content h4 {
  font-size: 1.1em;
  font-weight: 600;
  margin: 1.2em 0 0.5em 0;
}

.markdown-content h5,
.markdown-content h6 {
  font-size: 1em;
  font-weight: 600;
  margin: 1em 0 0.5em 0;
}

.markdown-content p {
  margin: 1em 0;
  line-height: 1.8;
}

.markdown-content a {
  color: var(--theme-primary);
  text-decoration: none;
  transition: color 0.2s;
}

.markdown-content a:hover {
  color: var(--theme-primary-hover);
  text-decoration: underline;
}

.markdown-content strong {
  font-weight: 700;
}

.markdown-content em {
  font-style: italic;
}

.markdown-content code {
  background: #f5f5f7;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
  color: #d63384;
}

.markdown-content pre {
  background: #f5f5f7;
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5em 0;
  border: 1px solid #e5e5e5;
}

.markdown-content pre code {
  background: transparent;
  padding: 0;
  color: #1d1d1f;
  font-size: 0.9em;
  display: block;
  white-space: pre;
  font-family: 'Courier New', Courier, monospace;
}

.markdown-content blockquote {
  border-left: 4px solid var(--theme-primary);
  padding-left: 1em;
  margin: 1.5em 0;
  color: #6e6e73;
  background: #f9f9f9;
  padding: 0.5em 1em;
  border-radius: 0 4px 4px 0;
}

.markdown-content ul,
.markdown-content ol {
  padding-left: 2em;
  margin: 1em 0;
}

.markdown-content li {
  margin: 0.5em 0;
  line-height: 1.6;
}

.markdown-content ul {
  list-style-type: disc;
}

.markdown-content ol {
  list-style-type: decimal;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
  font-size: 0.95em;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
}

.markdown-content thead {
  background: #f5f5f7;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid #e5e5e5;
  padding: 0.75em 1em;
  text-align: left;
}

.markdown-content th {
  background: #f5f5f7;
  font-weight: 600;
  color: #1d1d1f;
}

.markdown-content tbody tr:nth-child(even) {
  background: #f9f9f9;
}

.markdown-content tbody tr:hover {
  background: #f0f0f0;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1em 0;
  display: block;
}

.markdown-content hr {
  border: none;
  border-top: 2px solid #e5e5e5;
  margin: 2em 0;
}

.markdown-content del {
  color: #86868b;
  text-decoration: line-through;
}

.markdown-content input[type="checkbox"] {
  margin-right: 0.5em;
}

@media (max-width: 768px) {
  .markdown-content {
    font-size: 16px;
  }

  .markdown-content h1 {
    font-size: 1.75em;
  }

  .markdown-content h2 {
    font-size: 1.35em;
  }

  .markdown-content h3 {
    font-size: 1.15em;
  }

  .markdown-content p {
    font-size: 1.05em;
    line-height: 1.9;
  }

  .markdown-content li {
    font-size: 1.05em;
    line-height: 1.8;
  }

  .markdown-content code {
    font-size: 0.85em;
  }

  .markdown-content pre {
    padding: 0.75em;
    font-size: 0.85em;
  }

  .markdown-content th,
  .markdown-content td {
    padding: 0.5em 0.75em;
    font-size: 0.9em;
  }

  .markdown-content blockquote {
    font-size: 1em;
  }
}
</style>
