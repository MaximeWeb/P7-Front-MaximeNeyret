const mongoose = require ('mongoose');

mongoose.set('strictQuery', true);
mongoose 
.connect('mongodb+srv://'+ process.env.DB_USER_PASS +'@cluster0.htxre6g.mongodb.net/ProjetMernYTB', {
   
    useNewUrlParser: true,
    useUnifiedTopology: true,   
    
  
    
})   
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


