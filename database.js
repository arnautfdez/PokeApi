const mongoose = require('mongoose');
let password = '4ZnQt7mAeqiXNT6A';
let dbname = 'db';
mongoose.connect(`mongodb+srv://admin:${password}@cluster0.hz4bh.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));