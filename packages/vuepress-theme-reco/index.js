const path = require('path')

// Theme API.
module.exports = (options, ctx) => ({
  alias () {
    const { themeConfig, siteConfig } = ctx
    // resolve algolia
    const isAlgoliaSearch = (
      themeConfig.algolia ||
      Object.keys(siteConfig.locales && themeConfig.locales || {})
        .some(base => themeConfig.locales[base].algolia)
    )
    return {
      '@AlgoliaSearchBox': isAlgoliaSearch
        ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
        : path.resolve(__dirname, 'noopModule.js'),
      '@SearchBox': path.resolve(__dirname, 'components/SearchBox.vue')
    }
  },

  plugins: [
    '@vuepress-reco/back-to-top',
    '@vuepress-reco/loading-page',
    // '@vuepress-reco/pagation',
    ['@vuepress-reco/pagation', {
      perPage: 3
    }],
    '@vuepress-reco/comments',
    '@vuepress/active-header-links',
    ['@vuepress/medium-zoom', {
      selector: '.theme-reco-content :not(a) > img'
    }],
    '@vuepress/plugin-nprogress',
    ['@vuepress/plugin-blog', {
      permalink: '/:regular',
      frontmatters: [
        {
          id: 'tags',
          keys: ['tags'],
          path: '/tag/',
          layout: 'Tags',
          scopeLayout: 'Tag'
        },
        {
          id: 'categories',
          keys: ['categories'],
          path: '/categories/',
          layout: 'Categories',
          scopeLayout: 'Category'
        },
        {
          id: 'timeline',
          keys: ['timeline'],
          path: '/timeline/',
          layout: 'TimeLines',
          scopeLayout: 'TimeLine'
        }
      ]
    }],
    'vuepress-plugin-smooth-scroll',
    ['container', {
      type: 'tip',
      before: info => `<div class="custom-block tip"><p class="title">${info}</p>`,
      after: '</div>',
      defaultTitle: ''
    }],
    ['container', {
      type: 'warning',
      before: info => `<div class="custom-block warning"><p class="title">${info}</p>`,
      after: '</div>',
      defaultTitle: ''
    }],
    ['container', {
      type: 'danger',
      before: info => `<div class="custom-block danger"><p class="title">${info}</p>`,
      after: '</div>',
      defaultTitle: ''
    }],
    ['container', {
      type: 'right',
      defaultTitle: ''
    }],
    ['container', {
      type: 'theorem',
      before: info => `<div class="custom-block theorem"><p class="title">${info}</p>`,
      after: '</div>',
      defaultTitle: ''
    }],
    ['container', {
      type: 'details',
      before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
      after: () => '</details>\n',
      defaultTitle: {
        '/': 'See More',
        '/zh/': '更多'
      }
    }]
  ]
})
