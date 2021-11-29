module.exports = {
    devServer: {
        disableHostCheck: true
    },
    pwa: {
        manifestOptions: {
          name: "HAHAMasgu",
          short_name: "HAHAMasgu",
          start_url: "./",
          display: "standalone",
          theme_color: "#000000",
          icons: [
            {
              src: "public/favicon.svg",
              sizes: "512x512",
              type: "image/svg+xml",
              purpose: "any maskable",
            },
          ],
        },
    
        themeColor: "#4DBA87",
        msTileColor: "#000000",
        appleMobileWebAppCapable: "yes",
        appleMobileWebAppStatusBarStyle: "black",
        iconPaths: {
          maskicon: null,
          favicon32: "public/img/icons/favicon-32x32.png",
          favicon16: "public/img/icons/favicon-16x16.png",
          appleTouchIcon: null,
          msTileImage: null,
        },
        // configure the workbox plugin
        workboxPluginMode: "GenerateSW",
    },
}