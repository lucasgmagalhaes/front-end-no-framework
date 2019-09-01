const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  // Diz ao Webpack quais otimizações integradas devem ser usadas.
  // No modo 'produção', o Webpack minimiza e uglifica nosso código JS
  // Se você deixar isso de fora, o Webpack usará como padrão 'produção'
  mode: devMode ? "development" : "production",
  // Diz ao Webpack onde começar o processo de empacotamento
  entry: ["./src/scripts/main.js", "./src/styles/main.scss"],
  // Define o caminho onde o Webpack colocaráo arquivo JS incluído
  output: {
    path: path.resolve(__dirname, "public"),
    // Especifica o caminho base para todos os ativos dentro da
    // aplicação. Relativo ao caminho de saída.
    publicPath: "/assets",
    // O nome do pacote configurável de saída.
    filename: "assets/scripts/bundle.js"
  },
  module: {
    // Matriz de regras que informa ao Webpack como os módulos (saída)
    // Será criado
    rules: [
      {
        // Procura arquivos JavaScript e aplica o babel-loader
        // excluindo o diretório './node_modules'. Usa o
        // configuração em `.babelrc`
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        // Procura arquivos Sass e processa-os de acordo com o
        // regras especificadas nos diferentes carregadores
        test: /\.(sa|sc)ss$/,
        // Usa os seguintes carregadores da direita para a esquerda, para que
        // use o sass-loader primeiro e termine com MiniCssExtractPlugin
        use: [
          {
            // Extrai o CSS em um arquivo separado e usa as
            // configurações definidas na seção 'plugins'
            loader: MiniCssExtractPlugin.loader
          },
          {
            // Interpreta CSS
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          {
            // Usa PostCSS para minificar e corrigir automaticamente. Este carregador
            // usa a configuração em `postcss.config.js`
            loader: "postcss-loader"
          },
          {
            // Adiciona suporte para arquivos Sass
            loader: "sass-loader"
          }
        ]
      },
      {
        // Adiciona suporte para carregar imagens nas regras CSS. Parece
        // para .png, .jpg, .jpeg e .gif
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              // A imagem será nomeada com o nome original e
              // extensão
              name: "[name].[ext]",
              // Indica onde as imagens são armazenadas e usará
              // esse caminho ao gerar os arquivos CSS.
              // Exemplo, no main.scss
              publicPath: "../images",
              // Quando esta opção é 'true', o carregador emitirá
              // a imagem para output.path
              emitFile: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // Opções de configuração para MiniCssExtractPlugin. Aqui é
    // indicado qual deve ser o nome do arquivo CSS gerado
    new MiniCssExtractPlugin({
      filename: "assets/styles/main.css"
    })
  ]
};
