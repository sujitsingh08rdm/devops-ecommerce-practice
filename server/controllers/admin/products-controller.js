const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/products");

const handleImageUpload = async (req, res) => {
  try {
    //you are converting that buffer into a base64-encoded string
    //req.file.buffer contains the file in binary form (thanks to multer.memoryStorage()).
    const b64 = Buffer.from(req.file.buffer).toString("base64");

    // A data URL is a format Cloudinary accepts.
    /*
    Here, you're correctly constructing it:
    data: → prefix
    req.file.mimetype → e.g., image/jpeg
    ;base64, → telling it the data is base64-encoded
    b64 → the actual base64 data
    */
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    //You pass the data URL to imageUploadUtil(), which uploads it to Cloudinary.
    //result will contianer the secure_url & public_id.
    const result = await imageUploadUtil(url);

    res.json({ success: true, result });
  } catch (e) {
    console.log(e);
    res.json({
      success: false,
      message: "error occured",
    });
  }
};

//Add a new product

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "There was an error Adding product",
    });
  }
};

//fetch all  product
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({ success: true, data: listOfProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "There was an error fetching products",
    });
  }
};

//delete a product

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res
      .status(200)
      .json({ success: true, message: "Product deleted Successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "There was an error deleting product",
    });
  }
};

//edit a product

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price;
    findProduct.salePrice = salePrice === "" ? 0 : salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({ success: true, data: findProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "There was an error editing product",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
