const express = require("express");
const router = express.Router();

const pool = require("../database");
router.get("/add", (req, res)=>{

    res.render("links/add")
});

router.post("/add", async(req, res)=>{
    
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        //user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash("success", "Link saved successfully");
    res.redirect("/links");
    
});

router.get("/", async(req, res)=>{
    const links = await pool.query("SELECT * FROM links");
    res.render("links/list", { links }); 
});

router.get("/delete/:id", async(req, res)=>{
     const id = req.params.id;
     await pool.query("DELETE FROM links WHERE id = ?", id);
     req.flash("success", "Link deleted successfully");
     res.redirect("/links");
});

router.get("/edit/:id", async(req, res)=>{
    const id = req.params.id;
    const link = await pool.query("SELECT * FROM links WHERE id = ?", id);

    res.render("links/edit", {link : link[0]});
});

router.post("/edit/:id", async(req, res)=>{
    
    const id = req.params.id;
    const {title, url , description} = req.body;
    
    const newLink = {
        title,
        url,
        description
    };
    
    await pool.query('UPDATE links set ? where id = ?', [newLink, id]);
    req.flash("success", "Link update successfully");
    //UPDATE `links` SET `id`=[value-1],`title`=[value-2],`url`=[value-3],`description`=[value-4],`user_id`=[value-5],`timestamp`=[value-6] WHERE 1
   
    res.redirect("/links");   
});
  
module.exports = router; 