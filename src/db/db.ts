import mongoose  from "mongoose";
const connectToDataBase = async():Promise<void>=>{//we use promise because any async function return promise
try {
  if(!process.env.MONGO_DB){
    throw new Error('mongo db uri not found')
  }
  /*in environment variable always there are string or undefined and type script need to know the type
  so we tell it that is a string */
  await mongoose.connect(process.env.MONGO_DB as string)//you can remove it
  console.log("connect to dat base")
} catch (error) {
  console.log("error when we connect to data base")
  throw new Error('error when we connect')
}
}
export default connectToDataBase;