process.env.VUE_APP_SERVER = (process.env.NODE_ENV !== 'production') ?
    "http://localhost:8181/" :
    "#production_url";

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    productionSourceMap: false,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/styles/variables.scss"; 
                    @import "@/styles/mixins.scss"; 
                    @import "@/styles/shared.scss";
                `
            }
        }
    }
};
