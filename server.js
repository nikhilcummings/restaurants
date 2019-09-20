const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurants', {useNewUrlParser: true}, { useFindAndModify: false });
app.use(express.static( __dirname + '/public/dist/public' ));
var uniqueValidator = require('mongoose-unique-validator');

const ReviewSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"], minlength: [3, "Name must be at least 3 characters"]},
    rating: {type: Number, required: [true, "Rating is required"], min: [1, "Minimum rating is 1"], max: [5, "Maximum rating is 5"]},
    comment: { type: String, required: [false]},
}, { timestamps: true })
const Review = mongoose.model('Review', ReviewSchema);

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, unique:true, required: [true, "Name is required"], minlength: [3, "Name must be at least 3 characters"]},
    cuisine: {type: String, required: [true, "Cuisine is required"], minlength: [3, "Cuisine must be at least 3 characters"]},
    reviews: [ReviewSchema],
    canDelete: {type : Boolean, default: false },
    }, { timestamps: true })
const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
RestaurantSchema.plugin(uniqueValidator);

app.get("/restaurants", function(req, res){
    Restaurant.find()
    .then(restaurants => res.json({restaurants}))
    .catch(err => console.log(err));
})

app.get("/reviews", function(req, res) {
    Review.find()
    .then(reviews => res.json({reviews}))
    .catch(err => console.log(err));
})

app.post("/restaurants/new", function(req, res) {
    // console.group("Post Data")
    // console.table(req.body);
    // console.groupEnd();
    Restaurant.create(req.body, (err, restaurant) => {
        if(err) {
            console.log("error: ", err);
            res.json({"Message": "Error", "err":err})
        } else {
            console.log("success");
            res.json({"Message":"Success", "restaurant":restaurant})
        }
    })
    // const restaurant = new Restaurant();
    // restaurant.name = req.body.name;
    // restaurant.cuisine = req.body.cuisine;
    // restaurant.imgUrl = req.body.imgUrl;
    // console.log(req.body.name);
    // restaurant.save()
})

app.post("/restaurants/:id/review", function(req, res){
    console.log("inside server")
    Review.create(req.body, function(err, data){
        if(err){
             console.log(err);
             res.json({"Message": "Error", "err":err})
        }
        else {
             Restaurant.findOneAndUpdate({_id: req.params.id}, {$push: {reviews: data}}, {new: true}, function(err, data){
                  if(err){
                       console.log(err);
                  }
                  else {
                        res.json({"Message":"Success", "review":req.body})
                  }
             })
         }
   })
})

app.get("/restaurants/:id", function(req, res)  {
     Restaurant.findById(req.params.id, function(err, restaurant) {
         if(!restaurant){
             console.log("Restaurant not found");
         } else {
             res.json({restaurant});
         }
        //  } else{
        //      if(req.body.name){
        //          if(req.body.name.length>0){
        //              restaurant.name = req.body.name;
        //          }
        //      }
        //      if(req.body.cuisine){
        //          if(req.body.cuisine>0){
        //              restaurant.cuisine = req.body.cuisine;
        //          }
        //      }
        //      if(req.body.imageUrl){
        //          if(req.body.imgUrl.length>0){
        //              restaurant.imgUrl = req.body.imgUrl;
        //          }
        //      }
        //      restaurant.modified = new Date();
        //      restaurant.save(function(err) {
        //          if (err)
        //            console.log('error')
        //          else
        //            res.json({restaurant});
        //        });
        //  }
     })
 })

app.put("/restaurants/:id/update", function(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(!restaurant){
            console.log("Restaurant not found");
        } else{
            if(req.body.name){
                if(req.body.name.length>0){
                    restaurant.name = req.body.name;
                }
            }
            if(req.body.cuisine){
                if(req.body.cuisine.length>0){
                    restaurant.cuisine = req.body.cuisine;
                }
            }
            restaurant.modified = new Date();
            restaurant.save(function(err) {
                if (err)
                  console.log('error')
                else
                  res.json({restaurant});
              });
        }
    })
})

app.put("/restaurants/:id/makedeletable", function(req, res){
    console.log("inside server")
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(!restaurant){
            console.log("Restaurant not found");
        } else{
            restaurant.canDelete = true;
            restaurant.modified = new Date();
            restaurant.save(function(err) {
                if (err)
                  console.log('error')
                else
                  res.json({restaurant});
              });
        }
    })
})

app.delete("/restaurants/:id/delete", function(req, res) {
    Restaurant.findByIdAndRemove(req.params.id, req.body, function(err, data){
        if(!err){
            console.log("deleted");
        }
    })
})

app.all("*", (req, res,next) => {
    //res.sendFile(path.resolve("./public/dist/public/index.html"))
});

const server = app.listen(3000, function() {
    console.log('listening on localhost:3000');
});