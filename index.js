const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/route');
const admin = require('./routes/admin');
const cors = require('cors');
const index = express();
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const port = process.env.PORT || 8080
console.log("Server is running on port");
console.log(process.env.PORT);
// const port = 5000;
const sequelize = require('./config');
const Organization = require('./models/Organization');
const{ User,Role} = require('./models/user');

const Goal = require('./models/Goal');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const passportJWT = require('passport-jwt');
const { createPublicToken } = require('./controller/Usercontroller');
const catchAsync = require('./utils/catchAsync');
const FiscalCalendar = require('./models/FiscalCalendar');
const { getProduct } = require('./controller/Productcontroller');
const { getCommision } = require('./controller/Commisioncontroller');
const Product = require('./models/Product');
const CommissionRate = require('./models/CommisionRate');
const keyLength = 32;

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
const tokenBlacklist = new Set();
const secretKey = crypto.randomBytes(keyLength).toString('hex');

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = secretKey;

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = getUser({ id: jwt_payload.id });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);
index.use(passport.initialize());

index.use(bodyParser.urlencoded({ extended: true }));
index.use(bodyParser.json());
index.use(cors());

async function syncDatabase() {
  try {
    await sequelize.sync({ }); // Use { force: true } to drop and recreate tables in development
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

syncDatabase();
// index.use(cookieParser());

const whiteListRoute =['/users/token/public','/login']
const allowedOrigins = [
  'http://localhost:3000',
  'https://lemon-rock-097795510.3.azurestaticapps.net',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
};

// index.use(cors());

// index.use(async(req,res,next)=>{
//   let isFreePass = false
//   for(let route of whiteListRoute){
//       if(req.url.match(route)){
//           isFreePass = true;
//           break;
//       }
//   }
//   if(isFreePass){
//       next();
//   }else{
//       if(!(req.headers.authorization &&
//           req.headers.authorization.startsWith("Bearer") &&
//           req.headers.authorization.split(" ")[1])){
//           const publicCookie = req.cookies['public'];
//           if(publicCookie){
//               req.headers.authorization = 'Bearer '+publicCookie;
//               next();
//           }else{
//               res.status(401).json({statusCode:401,status:'access denied by cookie'});
//           }
//       }else{
//           next();
//       }
//   }

// })
index.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Both email and password are required', success: false });
    }

    const user = await getUser({ email : email});

    if (!user) {
      return res.status(401).json({ message: 'No such user found', success: false });
    }

    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error', success: false });
      }

      if (!result) {
        return res.status(401).json({ message: 'Incorrect password', success: false });
      }

      // Password is correct
      try {
        const payload = { id: user.id };
        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        return res.json({ message: 'Login successful', success: true, user: user, token: token });
      } catch (tokenError) {
        return res.status(500).json({ message: 'Token generation error', success: false });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'There is an error, please contact admin', success: false });
  }
});

// index.post('/login', async function(req, res, next) {
//   const { email, password } = req.body;
//   if (email&& password) {
//     let user = await getUser({ email: email});
//     if (!user) {
//       res.status(401).json({ message: 'No such user found' });
//     }
//     if (user.password === password) {
    
//       let payload = { id: user.id };
//       let token = jwt.sign(payload, jwtOptions.secretOrKey);
//       res.json({ success: true,user:user, token: token });
//     } else {
//       res.status(401).json({ msg: 'Password is incorrect' });
//     }
//   }
// });

const getUser = async obj => {
  return await User.findOne({
    where: obj,
  });
};


index.post('/logout',(req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    tokenBlacklist.add(token);
    res.json({ message: 'Logged out successfully' ,success: true});
  } else {
    res.status(401).json({ message: 'Unauthorized' ,success: true});
  }
});



index.get('/protected', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token && !tokenBlacklist.has(token)) {
    res.json('Success! You can now see this without a token.');
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

const checkTokenValidity = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  
  if (token && !tokenBlacklist.has(token)) {
    req.validToken = true; // You can attach a flag to the request object to indicate token validity
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

index.use('/api/v1/valid', (req, res) => {
  if (req.validToken) {
    res.json('Success! You can now see this with a valid token.');
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

index.use('/api/v1/invalid', (req, res) => {
  if (req.validToken) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    res.json('Success! You can now see this with an invalid token.');
  }
});


index.use('/api/v1', checkTokenValidity, routes);
index.use('/admin', admin);

index.get('/ProviderProduct', async (req, res) => {
  try {
    const allProduct = await Product.findAll();

    if (allProduct) {
      res.status(200).json({ code: 200, data: allProduct });
    } else {
      res.status(404).json({ code: 404, data: null });
    }
  } catch (error) {
    console.error('Error finding Product:', error);
    res.status(500).json({ code: 500, data: null });
  }
});


index.use('/CommissionRates', async (req, res) => {
  try {
    const allCommission = await CommissionRate.findAll();

    if (allCommission) {
      res.status(200).json({ code: 200, data: allCommission });
    } else {
      res.status(404).json({ code: 404, data: null });
    }
  } catch (error) {
    console.error('Error finding CommissionRate:', error);
    res.status(500).json({ code: 500, data: null });
  }
});


index.post('/api/User',async (req, res) => {
  try {
      const {
          roleid, email, password, First_name, Last_name, BaseShopID, Mobileno
      } = req.body;
      let user = await getUser({ email: email});
      if(user){
        return res.status(400).json({ message: 'Email already exists' });

      }
      bcrypt.hash(password, 10, async(err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: 'Error hashing password' });
        }
      // Create a new client using the Sequelize model
      const newUser = await User.create({
          roleid, email, password:hashedPassword, First_name, Last_name, BaseShopID, Mobileno
      });

      const response = {
          success: true,
          message: 'User created successfully',
          data: {
              email, password, First_name, Last_name, BaseShopID, Mobileno
          }
      };
      res.status(201).json(response);
  } );
}catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
          // Handle the unique constraint violation error
          res.status(400).json({ message: 'Email is already taken.' });
      } else {
          res.status(500).json({ message: error.message + ' An error occurred while creating the User' });
      }
  }

})

index.get('/getBaseShopByEmail', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await Organization.findOne({
      where: { WorkEmail: email },
      attributes: ['BaseShopID'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const BaseShopID = user.BaseShopID;
    return res.status(200).json({ message: 'Base shop ID found', BaseShopID });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while fetching the base shop ID', error });
  }
});

index.get('/getDataByBaseShopID', async (req, res) => {
  try {
    const { BaseShopID } = req.query;

    if (!BaseShopID) {
      return res.status(400).json({ code: 400, data: null });
    }

    const data = await Organization.findAll({
      where: { BaseShopID },
    });

    if (!data || data.length === 0) {
      return res.status(404).json({ code: 404, data: null });
    }

    return res.status(200).json({ code: 200, data });
  } catch (error) {
    return res.status(500).json({ code: 500, data: null });
  }
});

index.get('/getDataByFiscalYear', async (req, res) => {
  try {
    // Assuming you have a Sequelize model named FiscalCalendar
    const data = await FiscalCalendar.findAll({
      where: {
        Fiscal_Year: [2023, 2024], // Modify as needed
      },
    });

    if (!data || data.length === 0) {
      return res.status(404).json({ code: 404, data: null });
    }

    return res.status(200).json({ code: 200, data });
  } catch (error) {
    return res.status(500).json({ code: 500, data: null });
  }
});

index.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    // console.log(req)
});
