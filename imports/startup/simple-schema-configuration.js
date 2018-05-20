import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

SimpleSchema.defineValidationErrorTransform((e)=>{
    throw new Meteor.Error(400, e.message)
})