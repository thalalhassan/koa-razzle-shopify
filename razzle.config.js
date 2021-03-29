module.exports = {
  plugins: [
    {
      name: 'scss',
      options: {
        ignoreOrder: true,
        postcss: {
          prod: {
            sourceMap: false,
          },
        },
      },
    },
  ],
};
