const mongoose=require('mongoose')


var BannerSchema = new mongoose.Schema({
    name: {
      type: String,
      required:true
    },    
    link: {
        type: String,
        required:true     
    },

    status: {
        type: String,
        required:true
    },
    
    desktopImage:{
      type: String,
      required:true

    
    },

    mobileImage:{
      type: String,
      required:true
    },
    
    created: {
      type: Date,
      default: Date.now
    }
  });

const Banner = mongoose.model('Banner',BannerSchema); //convert to model named banner
module.exports =Banner;