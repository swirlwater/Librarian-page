<template>
    <GlobalFooter :links="links" :copyright="copyright" />
</template>
<script>
export default {
  data () {
    return {
      links: [
        {
          key: '帮助',
          title: '帮助',
          href: 'https://www.iviewui.com',
          blankTarget: true
        },
        {
          key: 'github',
          icon: 'logo-github',
          href: 'https://github.com/whx1978938887/Librarian-page',
          blankTarget: true
        },
        {
          key: '条款',
          title: '条款',
          href: '',
          blankTarget: true
        }
      ],
      copyright: '广东财经大学 © 2023 Librarian-page All Rights Reserved'
    }
  }
}
</script>
