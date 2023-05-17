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
          href: 'https://github.com/whx1978938887',
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
      copyright: 'Copyright © 2023 广东财经大学 All Rights Reserved'
    }
  }
}
</script>
