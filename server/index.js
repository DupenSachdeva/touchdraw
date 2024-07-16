const  express = require("express")
const  body = require("body-parser")
const  cors = require("cors")
const  jwt = require("jsonwebtoken")
const  mongoose = require("mongoose")
      

const  app = express()
app.use(body.json());
app.use(cors());

const Schema = mongoose.Schema;

const adminTable = new mongoose.Schema({
    username: String,
    password: String,
    poll: [{ type: Schema.Types.ObjectId, ref: "poll" }],
    wallet: Number,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    }
})

const pollTable = new Schema({
    "name": String,
    "description":String,
    number: Number,
    creator: { type: Schema.Types.ObjectId, ref: "admin" },
    createdTime: Date,
    optionA: String,
    optionB: String,
    optionC: String,
    optionD: String,
    instances: [{ type: Schema.Types.ObjectId, ref: "pollinstance" }],
    maxInstances: Number
})

const pollinstance = new Schema({
    poll: { type: Schema.Types.ObjectId, ref: "poll" },
    selectedOption: Number,
    answerTime: Date,
    selectedBy: { type: Schema.Types.ObjectId, ref: "admin" }
}
)

const admin = mongoose.model('admin', adminTable);
const poll = mongoose.model('poll', pollTable);
const pollResult = mongoose.model('pollResult', pollinstance);

mongoose.connect('mongodb+srv://dupensachdeva:t2qFUNIz5NmGuxBO@cluster0.kwwb8uo.mongodb.net/pooling');

const adminSecret = "dupen";

app.post('/admin/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await admin.findOne({ username, password });
    if (user)
        res.status(400).send("user already exists");
    else {
        const newadmin = new admin({username, password, wallet: 0 })
        await newadmin.save();

        const token = jwt.sign({ username, roll: 'admin' }, adminSecret, { expiresIn: '1hr' })
        res.status(200).json({ newadmin, token });
    }
})

app.post('/admin/login',async (req,res)=>{
    const username = req.body.username;
    const user = await admin.findOne({username})
    if(user){
        const token = jwt.sign({username,roll:'admin'},adminSecret,{expiresIn:'1hr'})
        res.status(200).send({user,token});
    }
    else{
       res.status(400).send("please sign up first")}
})

function authenticateAdmin(req,res,next){
    const token = req.headers.token;
    if(!token)
        return res.status(400).send("no token")
    jwt.verify(token,adminSecret,async (err,user)=>{
        if(err)
            return res.status(404);
        if(!user)
            return res.status(400).send({});

        const userobj = await admin.findOne({username:user.username})
        if(!userobj)
            return res.send({});

        req.user = userobj;
        req.username = user.username;
        next();
    })
}

app.post('/admin/poll',authenticateAdmin, async(req,res)=>{
    const pollnew = req.body;
    pollnew.creator = req.user._id;

    const pollcost = req.headers.cost;
    console.log('hi');
    if(req.user.wallet < pollcost)
        return res.send({desired:false,message:"please charge your wallet"});
    
    const newpoll = new poll(pollnew);
    await newpoll.save();
    req.user.poll.push(newpoll);
    req.user.wallet = req.user.wallet - pollcost;
    await req.user.save();
    const user = req.user;
    res.status(200).json({desired:true,newpoll,user});
})

app.put("/admin/recharge",authenticateAdmin,async(req,res)=>{
    try{console.log("hi");
        const money = req.headers.money;
        req.user.wallet = req.user.wallet + Number(money);
        await req.user.save();
        return res.send(req.user);}
        catch(err){console.log(`error is ${err}`);}
    
})

const usersecret = "sachdeva";
app.post("/touser",authenticateAdmin,async(req,res)=>{
    const admin = req.user;
    admin.role = 'user';
    await req.user.save();
    
    const username = req.user.username;
    const role = 'user';
    const usertoken = jwt.sign({username,role},usersecret,{expiresIn:'1hr'})

    return res.json({role,usertoken});
})

app.get('/polls',async (req,res)=>{
    const polls = await poll.find();
    return res.status(200).send(polls); 
})

app.get('/admin/polls', authenticateAdmin,async(req,res)=>{
    const adminuser = req.user;
    const username = req.username;
    const user = await admin.findOne({username:username}).populate("poll")
   
    console.log(username);
    console.log(user);
     
    const polls = user.poll
    console.log(polls);

    return res.status(200).json(polls);
})
app.get('/admin/me',authenticateAdmin,(req,res)=>{
    const admin = req.user;
    console.log('manthan');
    return res.send(admin);
})
app.listen(3000, () => {
    console.log('running on 3000');
})