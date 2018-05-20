import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import '../imports/api/users';
import { Links } from '../imports/api/links'
import '../imports/api/links'
import '../imports/startup/simple-schema-configuration';
Meteor.startup(() => {
  // console.log(Meteor.users.username)
  WebApp.connectHandlers.use((req, res, next)=>{
   const _id = req.url.slice(1);
  
    const link = Links.findOne({_id})
   
    if(link){
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id)
    }else{
      next();
    }
  })
  // code to run on server at startup
});
