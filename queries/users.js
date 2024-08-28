import User from "@/model/user-model";

export async function createUser(user) {
  try{
    console.log("creating new user")
    await User.create(user);
  } catch(e){
    throw new Error(e)
  return null;
  }
}