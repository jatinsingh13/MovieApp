const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const axios=require("axios");


app.set("view engine","ejs");
app.use(express.static(__dirname+"/public/"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
	
	res.render("../views/home.ejs");
});

app.post("/home/search",(req,res)=>{
	var name=req.body.name;
	
	var url="http://www.omdbapi.com/?s="+name+"&apikey=5f623f39";
		axios.get(url)
		  .then(response => {
			res.render("../views/index.ejs",{data:response.data});
			console.log(response.data);
			})

		  .catch(error => {
			console.log(error);
		  });
});

app.get("/movie/:id",(req,res)=>{
	var movieID=req.params.id;
	
	var url="http://www.omdbapi.com/?i="+movieID+"&apikey=5f623f39";
		axios.get(url)
		  .then(response => {
			res.render("../views/movie.ejs",{data:response.data});
			console.log("----------------------");
			console.log(response.data);
			})

		  .catch(error => {
			console.log(error);
		  });
	
});

app.get("/contact",(req,res)=>{
	res.render("../views/contact.ejs")
});

app.get("/tandc",(req,res)=>{
	res.render("../views/tandc.ejs")
});



//setting up port
app.listen(3000,(err)=>{
	if(err){
		console.log(err);
	}else{
		console.log("app is listening on port 3000");
	}
});