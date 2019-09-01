// Faz o PostCSS a corrigir automaticamente e minimizar nosso
// CSS no modo de produção; caso contrário, não faça nada

const postcssPresetEnv = require('postcss-preset-env');

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    plugins: [
      postcssPresetEnv({
        browsers: ['> 1%']
      }),
      require('cssnano')
    ]
  };
  return;
}
