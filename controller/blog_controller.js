const moment = require('moment');

const blogModel = require('../models/blog_schema')

exports.createBlog = async(req, res) =>{
    const {title, body,author, description } = req.body;
    

    try{const blog =  await blogModel.create({
         title,
         body,
         author,
         description,
         timestamps: moment().toDate(),
    })
    res.json({
        message: "Blog posted succesfully", 
        blog
    })
}catch(err){
    res.send(err.message)
}
    //  console.log(blog)
    // // //  blog.createdAt = new Date();
    // // // blog.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    // await blogModel.create(blog)
    //     .then(blog => {
    //        res.status(201).send(blog)
    //     }).catch(err => {
    //         console.log(err)
    //         res.status(500).send(err)
    //     })
}
exports.getBlog = async(req, res) =>{

    const id = req.params.id;
    await blogModel.findById(id)
        .then(blog => {
            res.status(200).send(blog)
        }).catch(err => {
            console.log(err)
            res.status(404).send(err)
        })

        // const {id} = req.params;
    // const blog = await blogModel.findById(id);

    // if(!blog){
    //     return res.status(404).json({status: false, blog: null})
    // }
    // return res.json({status: true, blog})

}

exports.getBlogs = async(req, res) =>{
   const {query} = req;
    console.log(query);
     const {read_count , read_time, 
        timestamps, order = 'asc',
        order_by = 'timestamps', 
        author, title, tags,
       page =1, per_page =20} = query;

     const findQuery = {}
     if(timestamps){
        findQuery.timestamps = {
             $gt: moment(timestamps).startOf('day').toDate(),
             $lt: moment(timestamps).endOf('day').toDate()}
     }
     if(read_count){
        findQuery.read_count = read_count;
     }
     if(title){
        findQuery.title = title;
     }
     if(author){
        findQuery.author = author;
     }
     if(tags){
        findQuery.tags = tags;
     }

     if(read_time){
        findQuery.read_time = read_time;
     }


     const sortQuery = {};
    //  console.log(sortQuery)

     const sortAttribute = order_by.split(',')
     for(const attribute of sortAttribute){

        if(order === 'asc' && order_by){
        sortQuery[attribute] = 1
     }
     if(order === 'desc' && order_by){
        sortQuery[attribute] = -1
      }
     }

     

    //  const blog = await blogModel.find();
    // return res.json({status: true, blog})
    await blogModel.find(findQuery)
    .sort(sortQuery)
    .skip(page)
    .limit(per_page)

        .then(blogs => {
            res.status(200).json(blogs)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })

}

exports.updateBlog = async(req, res) =>{
    const id = req.params.id
    const blog = req.body
    blog.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    await blogModel.findByIdAndUpdate(id, blog, { new: true })
        .then(newBlog => {
            res.status(200).send(newBlog)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })

}
// blogRouter.patch('/:id', async(req, res) =>{
//     const {id} = req.params;
//     const { state } = req.body;
//     const blog = await blogModel.findById(id);
// if(!blog){
//         return res.status(404).json({status: false, blog: null})
//     }
//     blog.state = state;
//     await blog.save()

//     return res.json({status: true, blog})
//  }
// )

exports.deleteBlog = async(req, res) =>{
   const id = req.params.id
    await blogModel.findByIdAndRemove(id)
        .then(blog => {
            res.status(200).send(blog)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })

}