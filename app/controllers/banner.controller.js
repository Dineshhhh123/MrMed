const Banner = require('../models/banner.model');

//Creating a new Banner
const multer = require('multer');
const path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
  });
  
var upload = multer({ storage: storage });
  
var uploadMultiple = upload.fields([{ name: 'desktopImage', maxCount: 1 }, { name: 'mobileImage', maxCount: 1 }])


const newBanner = (req, res)=> {
    //check if the Banner name already exists in db
    Banner.findOne({ name: req.body.name }, (err, data) => {

        //if Banner not in db, add it
        if (!data) {
            //create a new banner 
            const newBanner = new Banner({
                name:req.body.name,
                link:req.body.link,
                status:req.body.status,
                desktopImage:req.body.desktopImage,
                mobileImage:req.body.mobileImage
            })

            // save this object to database
            newBanner.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        //if there's an error or the banner is in db, return a message         
        }else{
            if(err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({message:"Banner already exists"});
        }
    })    
};
const updateBanner=async (req,res)=>{
    try{
        let userID=req.body.name
        let {name,link,desktopImage,mobileImage,status}=req.body
        let updatedData = {}
        if(name){updatedData.name= name}
        if(link){updatedData.link=link}
        if(desktopImage){updatedData.desktopImage=desktopImage}
        if(mobileImage){updatedData.mobileImage=mobileImage}
        if(status){updatedData.status=status}


        let data= await Banner.findByIdAndUpdate(userID,{$set:updatedData},{new:true})
        res.status(200).json({
            message:'User updated successfully',
            response:data
        })
    }
    catch(error){
        res.status(400).json({
        
            message:'Error in updating  user'
        })
    }
}





// To display all the banner details from the database
const getAllBanner = (req, res) => {
    Banner.find({
        '$sort': {
          'id': -1,
          'status': 1
        }
      }, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};




//Getting One Banner Details
const getOneBanner = (req, res) => {
    let name = req.params.name; //get the banner name

    //find the specific banner with that name
    Banner.findOne({name:name}, (err, data) => {
    if(err || !data) {
        return res.json({message: "Banner doesn't exist."});
    }
    else return res.json(data); //return the tea object if found
    });
};


//DELETE 1 banner 
const deleteOneBanner = (req, res) => {
    let name = req.params.name; // get the name of tea to delete

    Banner.deleteOne({name:name}, (err, data) => {
    //if there's nothing to delete return a message
    if( data.deletedCount == 0) return res.json({message: "Banner doesn't exist."});
    //else if there's an error, return the err message
    else if (err) return res.json(`Something went wrong, please try again. ${err}`);
    //else, return the success message
    else return res.json({message: "Banner deleted."});
    });
};




module.exports = {
    getAllBanner, 
    newBanner,
    updateBanner,
    getOneBanner,
    uploadMultiple,
    deleteOneBanner
};