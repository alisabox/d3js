var $QIS2k$mongoose = require("mongoose");
var $QIS2k$http = require("http");
var $QIS2k$ws = require("ws");
var $QIS2k$express = require("express");
var $QIS2k$morgan = require("morgan");
var $QIS2k$cors = require("cors");
var $QIS2k$compression = require("compression");
var $QIS2k$helmet = require("helmet");
var $QIS2k$bcrypt = require("bcrypt");
var $QIS2k$jsonwebtoken = require("jsonwebtoken");
var $QIS2k$axios = require("axios");
var $QIS2k$dayjs = require("dayjs");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}



var $b7cf505ea69df35f$export$2e2bcd8739ae039 = {
    nodeEnv: "development",
    port: 4300,
    database: "mongodb+srv://alisa:<PASSWORD>@cluster0.mdzr4rf.mongodb.net/d3js",
    databasePassword: "C35iU1iMRC11aEyM",
    jwtSecret: "d3js-application",
    jwtExpiresIn: "24h"
};








var $88ba5255843fcaf3$exports = {};

$parcel$export($88ba5255843fcaf3$exports, "getAllMessages", () => $88ba5255843fcaf3$export$a5cd77f28ca54edc, (v) => $88ba5255843fcaf3$export$a5cd77f28ca54edc = v);

const $e527dcfa144142eb$var$messageModel = new (0, ($parcel$interopDefault($QIS2k$mongoose))).Schema({
    senderId: {
        type: (0, ($parcel$interopDefault($QIS2k$mongoose))).Schema.Types.ObjectId,
        ref: "User"
    },
    senderName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: [
            true,
            "Message is missing"
        ]
    }
}, {
    timestamps: true
});
const $e527dcfa144142eb$export$f69c19e57285b83a = (0, ($parcel$interopDefault($QIS2k$mongoose))).model("Message", $e527dcfa144142eb$var$messageModel);


var $ce3d454795bb2527$export$2e2bcd8739ae039 = (fn)=>{
    return (req, res, next)=>{
        fn(req, res, next).catch(next);
    };
};


var $88ba5255843fcaf3$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const $88ba5255843fcaf3$export$a5cd77f28ca54edc = (0, $ce3d454795bb2527$export$2e2bcd8739ae039)((req, res)=>$88ba5255843fcaf3$var$__awaiter(void 0, void 0, void 0, function*() {
        const messages = yield (0, $e527dcfa144142eb$export$f69c19e57285b83a).find();
        res.status(200).json({
            status: "success",
            results: messages.length,
            data: messages
        });
    }));


const $c04bedf3d40a5dbc$var$router = (0, ($parcel$interopDefault($QIS2k$express))).Router();
$c04bedf3d40a5dbc$var$router.route("/").get((0, $88ba5255843fcaf3$exports.getAllMessages));
var $c04bedf3d40a5dbc$export$2e2bcd8739ae039 = $c04bedf3d40a5dbc$var$router;



var $2b2a26bbef2cf963$exports = {};

$parcel$export($2b2a26bbef2cf963$exports, "signup", () => $2b2a26bbef2cf963$export$7200a869094fec36, (v) => $2b2a26bbef2cf963$export$7200a869094fec36 = v);
$parcel$export($2b2a26bbef2cf963$exports, "login", () => $2b2a26bbef2cf963$export$596d806903d1f59e, (v) => $2b2a26bbef2cf963$export$596d806903d1f59e = v);



class $6c9f226e50c82380$export$2e2bcd8739ae039 extends Error {
    get statusCode() {
        return this._statusCode;
    }
    get status() {
        return this._status;
    }
    constructor(message, statusCode){
        super(message);
        this._statusCode = statusCode;
        this._status = statusCode.toString().startsWith("4") ? "Bad Request" : "Server Error";
        Error.captureStackTrace(this, this.constructor);
    }
}




const $3191cac4f5e8ff1e$var$userModel = new (0, ($parcel$interopDefault($QIS2k$mongoose))).Schema({
    name: {
        type: String,
        required: [
            true,
            "User name is missing"
        ]
    },
    password: {
        type: String,
        required: [
            true,
            "Password is missing"
        ],
        minLength: [
            6,
            "Password length should be at least 6 characters"
        ],
        select: false
    }
});
const $3191cac4f5e8ff1e$export$1f44aaf2ec115b54 = (0, ($parcel$interopDefault($QIS2k$mongoose))).model("User", $3191cac4f5e8ff1e$var$userModel);


var $2b2a26bbef2cf963$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const $2b2a26bbef2cf963$var$accessToken = (id)=>{
    return (0, ($parcel$interopDefault($QIS2k$jsonwebtoken))).sign({
        id: id
    }, (0, $b7cf505ea69df35f$export$2e2bcd8739ae039).jwtSecret, {
        expiresIn: (0, $b7cf505ea69df35f$export$2e2bcd8739ae039).jwtExpiresIn
    });
};
const $2b2a26bbef2cf963$export$7200a869094fec36 = (0, $ce3d454795bb2527$export$2e2bcd8739ae039)((req, res, next)=>$2b2a26bbef2cf963$var$__awaiter(void 0, void 0, void 0, function*() {
        const { name: name , password: password  } = req.body;
        const candidate = yield (0, $3191cac4f5e8ff1e$export$1f44aaf2ec115b54).findOne({
            name: name
        });
        if (candidate) return next(new (0, $6c9f226e50c82380$export$2e2bcd8739ae039)("User with this name already exists", 400));
        const hashPassword = yield (0, ($parcel$interopDefault($QIS2k$bcrypt))).hash(password, 7);
        const newUser = yield (0, $3191cac4f5e8ff1e$export$1f44aaf2ec115b54).create({
            name: name,
            password: hashPassword
        });
        const token = $2b2a26bbef2cf963$var$accessToken(newUser._id);
        res.status(201).json({
            status: "success",
            token: token,
            data: {
                user: newUser
            }
        });
    }));
const $2b2a26bbef2cf963$export$596d806903d1f59e = (0, $ce3d454795bb2527$export$2e2bcd8739ae039)((req, res, next)=>$2b2a26bbef2cf963$var$__awaiter(void 0, void 0, void 0, function*() {
        const { name: name , password: password  } = req.body;
        if (!name || !password) return next(new (0, $6c9f226e50c82380$export$2e2bcd8739ae039)("Name or password is missing", 400));
        const user = yield (0, $3191cac4f5e8ff1e$export$1f44aaf2ec115b54).findOne({
            name: name
        }).select("+password");
        if (!user) return next(new (0, $6c9f226e50c82380$export$2e2bcd8739ae039)(`User with the name ${name} doesn't exist`, 401));
        const correctPassword = yield (0, ($parcel$interopDefault($QIS2k$bcrypt))).compare(password, user.password);
        if (!correctPassword) return next(new (0, $6c9f226e50c82380$export$2e2bcd8739ae039)("Incorrect password", 401));
        const token = $2b2a26bbef2cf963$var$accessToken(user._id);
        res.status(200).json({
            status: "success",
            token: token
        });
    }));


const $a446266c6758520b$var$router = (0, ($parcel$interopDefault($QIS2k$express))).Router();
$a446266c6758520b$var$router.post("/signup", (0, $2b2a26bbef2cf963$exports.signup));
$a446266c6758520b$var$router.post("/login", (0, $2b2a26bbef2cf963$exports.login));
var $a446266c6758520b$export$2e2bcd8739ae039 = $a446266c6758520b$var$router;



var $2b26324e77361f6d$exports = {};

$parcel$export($2b26324e77361f6d$exports, "getStocks", () => $2b26324e77361f6d$export$bd74767695c30817, (v) => $2b26324e77361f6d$export$bd74767695c30817 = v);

const $16b99681ab3024fb$var$stocksModel = new (0, ($parcel$interopDefault($QIS2k$mongoose))).Schema({
    key: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    data: [
        {
            date: Date,
            open: Number,
            high: Number,
            low: Number,
            close: Number,
            volume: Number,
            adjclose: Number
        }
    ]
});
$16b99681ab3024fb$var$stocksModel.pre("save", function(next) {
    for (const item of this.data)if (item.date) item.date = new Date(item.date * 1000);
    next();
});
const $16b99681ab3024fb$export$6ea1f8b6b256052b = (0, ($parcel$interopDefault($QIS2k$mongoose))).model("Stocks", $16b99681ab3024fb$var$stocksModel);



var $2b26324e77361f6d$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const $2b26324e77361f6d$export$bd74767695c30817 = (0, $ce3d454795bb2527$export$2e2bcd8739ae039)((req, res)=>$2b26324e77361f6d$var$__awaiter(void 0, void 0, void 0, function*() {
        const stocks = yield (0, $16b99681ab3024fb$export$6ea1f8b6b256052b).find({
            key: {
                $in: req.query.keys
            }
        });
        const filteredStocks = stocks.map((item)=>({
                key: item.key,
                name: item.name,
                data: item.data.filter((x)=>!!x.close)
            }));
        res.status(200).json({
            status: "success",
            results: filteredStocks.length,
            data: filteredStocks
        });
    }));


const $8bac9e955b3362f0$var$router = (0, ($parcel$interopDefault($QIS2k$express))).Router();
$8bac9e955b3362f0$var$router.route("/").get((0, $2b26324e77361f6d$exports.getStocks));
var $8bac9e955b3362f0$export$2e2bcd8739ae039 = $8bac9e955b3362f0$var$router;


var $290d7d5d9e932d2a$exports = {};

$parcel$export($290d7d5d9e932d2a$exports, "default", () => $290d7d5d9e932d2a$export$2e2bcd8739ae039, (v) => $290d7d5d9e932d2a$export$2e2bcd8739ae039 = v);



var $290d7d5d9e932d2a$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const $290d7d5d9e932d2a$var$options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/stock/v3/get-historical-data",
    headers: {
        "X-RapidAPI-Key": "f8132e822fmshc64ed9a17db06cep168a86jsn69eecf3051ef",
        "X-RapidAPI-Host": "yh-finance.p.rapidapi.com"
    }
};
const $290d7d5d9e932d2a$var$updateDatabase = (symbol, name)=>$290d7d5d9e932d2a$var$__awaiter(void 0, void 0, void 0, function*() {
        const stocks = yield (0, $16b99681ab3024fb$export$6ea1f8b6b256052b).findOne({
            key: symbol
        });
        const lastUpdateDate = (0, ($parcel$interopDefault($QIS2k$dayjs)))(stocks && stocks.data[0].date);
        const now = (0, ($parcel$interopDefault($QIS2k$dayjs)))();
        const daysDifference = now.diff(lastUpdateDate, "days");
        // database is updated from Wednesday to Saturday
        if (daysDifference > 1 && now.day() > 2) {
            console.log(`Requesting data for ${name} from RapidAPI`);
            const response = yield (0, ($parcel$interopDefault($QIS2k$axios))).request(Object.assign(Object.assign({}, $290d7d5d9e932d2a$var$options), {
                params: {
                    symbol: symbol
                }
            }));
            yield (0, $16b99681ab3024fb$export$6ea1f8b6b256052b).deleteOne({
                key: symbol
            });
            yield (0, $16b99681ab3024fb$export$6ea1f8b6b256052b).create({
                key: symbol,
                name: name,
                data: response.data.prices
            });
        }
    });
var $290d7d5d9e932d2a$export$2e2bcd8739ae039 = ()=>{
    $290d7d5d9e932d2a$var$updateDatabase("TSLA", "Tesla");
    $290d7d5d9e932d2a$var$updateDatabase("AAPL", "Apple");
    $290d7d5d9e932d2a$var$updateDatabase("MSFT", "Miscrosoft");
    $290d7d5d9e932d2a$var$updateDatabase("GOOG", "Google");
};


const $6be4ccaf8b42a818$var$app = (0, ($parcel$interopDefault($QIS2k$express)))();
if (process.env.NODE_ENV === "development") $6be4ccaf8b42a818$var$app.use((0, ($parcel$interopDefault($QIS2k$morgan)))("dev"));
$6be4ccaf8b42a818$var$app.use((0, ($parcel$interopDefault($QIS2k$express))).json());
(0, $290d7d5d9e932d2a$exports.default)();
$6be4ccaf8b42a818$var$app.use((0, ($parcel$interopDefault($QIS2k$compression)))());
$6be4ccaf8b42a818$var$app.use((0, ($parcel$interopDefault($QIS2k$helmet)))());
$6be4ccaf8b42a818$var$app.use((0, ($parcel$interopDefault($QIS2k$cors)))({
    origin: [
        "http://localhost:4200"
    ]
}));
$6be4ccaf8b42a818$var$app.use("/api/v1/messages", (0, $c04bedf3d40a5dbc$export$2e2bcd8739ae039));
$6be4ccaf8b42a818$var$app.use("/api/v1/users", (0, $a446266c6758520b$export$2e2bcd8739ae039));
$6be4ccaf8b42a818$var$app.use("/api/v1/stocks", (0, $8bac9e955b3362f0$export$2e2bcd8739ae039));
var $6be4ccaf8b42a818$export$2e2bcd8739ae039 = $6be4ccaf8b42a818$var$app;



var $b73c68855d96a06e$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const $b73c68855d96a06e$var$server = (0, ($parcel$interopDefault($QIS2k$http))).createServer((0, $6be4ccaf8b42a818$export$2e2bcd8739ae039));
const $b73c68855d96a06e$var$webSocket = new (0, $QIS2k$ws.WebSocketServer)({
    server: $b73c68855d96a06e$var$server
});
$b73c68855d96a06e$var$webSocket.on("connection", (socket)=>{
    socket.on("message", (data)=>$b73c68855d96a06e$var$__awaiter(void 0, void 0, void 0, function*() {
            const message = String(data);
            yield (0, $e527dcfa144142eb$export$f69c19e57285b83a).create(JSON.parse(message));
            $b73c68855d96a06e$var$webSocket.clients.forEach((client)=>{
                if (client.readyState === (0, $QIS2k$ws.WebSocket).OPEN) client.send(message);
            });
        }));
});
const $b73c68855d96a06e$var$DB = (0, $b7cf505ea69df35f$export$2e2bcd8739ae039).database.replace("<PASSWORD>", (0, $b7cf505ea69df35f$export$2e2bcd8739ae039).databasePassword);
(0, ($parcel$interopDefault($QIS2k$mongoose))).set("strictQuery", false) // as per Mongoose DeprecationWarning
.connect($b73c68855d96a06e$var$DB)// eslint-disable-next-line no-console
.then(()=>console.log("Connected to DB"));
const $b73c68855d96a06e$var$port = (0, $b7cf505ea69df35f$export$2e2bcd8739ae039).port || 4300;
$b73c68855d96a06e$var$server.listen($b73c68855d96a06e$var$port, ()=>{
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${$b73c68855d96a06e$var$port}`);
});


//# sourceMappingURL=index.js.map
