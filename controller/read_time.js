exports.readingTime = async(blog) => {
  const wordsPerMinute = 200;
  let words;
  const noOfWords = blog.split(" ").length;
  if(noOfWords > 0){
    let values = Math.ceil(noOfWords/wordsPerMinute)
    words = `${values}`
    return words;
  }
};


