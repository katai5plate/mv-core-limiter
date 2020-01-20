module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.ts"
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ogg|mp3|wav|mpe?g|webm)$/i,
        loader: "file-loader",
        options: {
          name: "[contenthash].[ext]"
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};
