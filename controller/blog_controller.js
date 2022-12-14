const moment = require('moment');
const readTime = require('./read_time');
const blogSchema = require('../models/blog_schema');
const UserSchema = require('../models/user_schema');

// const readingTime = await readTime.getReadTime(newBlog.body);
// newBlog.reading_time = readingTime;

//Authorised users should be able to create a blog
exports.createBlog = async (req, res) => {
    try {
        const newBlog = req.body;

        //readingTime
        const readingTime = await readTime.readingTime(newBlog.body);
        newBlog.read_time = readingTime;

        // Authenticate User who is creating blog
        // const blogCreator = await UserSchema.findOne({ _id: req.user._id });
        newBlog.author = req.user._id;

        // Creating new blog
        const newBlogCreated = await blogSchema.create(newBlog);
        console.log(newBlogCreated);
        return res.json({
            status: true,
            message: 'Blog created Successfully',
            newBlogCreated
        });
    } catch (error) {
        res.send(error.message);
    }
};

exports.getBlog = async (req, res) => {
    const id = req.params.id;
    await blogSchema
        .findById(id)
        .populate({ path: 'author', select: ['firstname', 'lastname'] })
        .then((blog) => {
            blog.read_count++;
            blog.readTime;
            blog.save();
            res.status(200).send(blog);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send(err);
        });
};

exports.getBlogs = async (req, res) => {
    const { query } = req;
    console.log(query);
    const {
        read_count,
        read_time,

        timestamps,
        order = 'asc',
        order_by = 'timestamps',
        author,
        title,
        tags,
        state = 'published',
        page = 0,
        per_page = 20
    } = query;

    const findQuery = {};
    if (timestamps) {
        findQuery.timestamps = {
            $gt: moment(timestamps).startOf('day').toDate(),
            $lt: moment(timestamps).endOf('day').toDate()
        };
    }
    if (read_count) {
        findQuery.read_count = read_count;
    }
    if (title) {
        findQuery.title = title;
    }
    if (author) {
        findQuery.author = author;
    }
    if (state) {
        findQuery.state = 'published';
    }
    if (tags) {
        findQuery.tags = tags;
    }

    if (read_time) {
        findQuery.read_time = read_time;
    }

    const sortQuery = {};
    console.log(sortQuery);
    // if (state) {
    //   findQuery.state === "published";
    //   // match.published = req.query.published === "true";
    // }

    const sortAttribute = order_by.split(',');
    for (const attribute of sortAttribute) {
        if (order === 'asc' && order_by) {
            sortQuery[attribute] = 1;
        }
        if (order === 'desc' && order_by) {
            sortQuery[attribute] = -1;
        }
    }

    // const blog =  blogSchema.find();
    //     console.log(blog)
    //  return res.json({status: true, blog})
    await blogSchema

        .find({ findQuery, state })
        .populate({ path: 'author', select: ['firstname', 'lastname'] })
        .sort(sortQuery)
        .skip(page)
        .limit(per_page)

        .then((blog) => {
            res.status(200).json(blog);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
};
exports.updateBlog = async (req, res) => {
    try {
        const blog = await blogSchema.findOne({ _id: req.params.id });
        if (req.user._id !== blog.author.toString()) {
            return res.status(400).json({ message: 'UnAthorized' });
        }
        await blog.updateOne(
            {
                title: req.body.title,
                description: req.body.description,
                body: req.body.body,
                state: req.body.state,
                tags: req.body.tags
            }
        ).exec();
        return res.status(200).json({ message: 'Updated Succesfully' });
    } catch (error) {}
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await blogSchema.findOne({ _id: req.params.id });
        // console.log(req.user.id, blog.author)
        if(req.user._id !== blog.author.toString()){
        return res.status(400).json({ message: "UnAuthorized"});
        }
         await blogSchema.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: 'Deleted Succesfully' });
    } catch (error) {
        res.send(error.message);
    }
};

// exports.updateBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { state } = req.body;

//     const blog = await blogSchema.findOne({ _id: id });

//     if (!blog) {
//       return res.status(404).json({ status: false, blog: null });
//     }

//     blog.state = state; //update state
//     await blog.save();
//     return res.json({ status: true, blog });
//   } catch (error) {
//     res.send(error.message);
//   }
// };
// exports.deleteBlog = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const blog = await blogSchema.deleteOne({ _id: id });
//         return res.status(200).json({ message: 'Deleted Succesfully', blog });
//     } catch (error) {
//         res.send(error.message);
//     }
// };
// exports.getUserBlogs = async (req, res) => {
//     const user = req.user._id;
//     const userBlogs = await UserSchema.findById(user).populate('blogs', {
//         title: 1
//     });
//     const blogs = userBlogs.blogs;
//     console.log(blogs);
// };
