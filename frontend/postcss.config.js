module.exports = {
    plugins: [
        require('postcss-smart-import')({ /* ...options */ }),
        require('precss')({ /* ...options */ }),
        require('autoprefixer')({ browsers: ['last 3 versions'] })
    ]
}