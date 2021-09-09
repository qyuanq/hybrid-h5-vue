const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const plugins = []

plugins.push(['import', {
  libraryName: 'vant',
  libraryDirectory: 'es',
  style: true
}, 'vant'])

if (IS_PROD) {
  plugins.push('transform-remove-console')
}
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins
}
