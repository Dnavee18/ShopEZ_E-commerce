import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { Admin, Cart, Orders, Product, User } from './Schema.js';
import path from 'path';

const app = express();
const PORT = 6001;

// Middleware setup
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect('mongodb://localhost:27017/shopEZ', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => console.error(`Error connecting to MongoDB: ${error}`));

// Routes

// User registration
app.post('/register', async (req, res) => {
    const { username, email, usertype, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, usertype, password: hashedPassword });
        const userCreated = await newUser.save();
        res.status(201).json(userCreated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// User login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Fetch banner
app.get('/fetch-banner', async (req, res) => {
    try {
        const admin = await Admin.findOne();
        if (admin && admin.banner) {
            res.json({ bannerUrl: `/images/${admin.banner}` });
        } else {
            res.status(404).json({ message: 'Banner not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching banner' });
    }
});

// Update banner
app.post('/update-banner', async (req, res) => {
    const { banner } = req.body;
    try {
        let admin = await Admin.findOne();
        if (!admin) {
            admin = new Admin({ banner, categories: [] });
        } else {
            admin.banner = banner;
        }
        await admin.save();
        res.json({ message: 'Banner updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating banner' });
    }
});

// Fetch users
app.get('/fetch-users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Fetch individual product
app.get('/fetch-product-details/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching product details' });
    }
});

// Fetch products
app.get('/fetch-products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Fetch categories
app.get('/fetch-categories', async (req, res) => {
    try {
        let admin = await Admin.findOne();
        if (!admin) {
            admin = new Admin({ banner: '', categories: [] });
            await admin.save();
        }
        res.json(admin.categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching categories' });
    }
});

// Add new product
app.post('/add-new-product', async (req, res) => {
    const { productName, productDescription, productMainImg, productCarousel, productSizes, productGender, productCategory, productNewCategory, productPrice, productDiscount } = req.body;
    try {
        let category = productCategory;
        if (category === 'new category') {
            const admin = await Admin.findOne();
            admin.categories.push(productNewCategory);
            await admin.save();
            category = productNewCategory;
        }

        const newProduct = new Product({
            title: productName,
            description: productDescription,
            mainImg: productMainImg,
            carousel: productCarousel,
            category,
            sizes: productSizes,
            gender: productGender,
            price: productPrice,
            discount: productDiscount
        });
        await newProduct.save();
        res.json({ message: 'Product added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding product' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
