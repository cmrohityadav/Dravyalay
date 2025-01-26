import { User } from "../models/user.model.js"

const generateAccessAndRefreshTokens=async(userId)=>{
    try {
        const user =await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()

        return {accessToken,refreshToken}
        
    } catch (error) {
        
    }
}

const login=async(req,res)=>{
    const {mobileNumber,address}=req.body
    try {

        let user=await User.findOne({mobileNumber})

        if(!user){
            user=new User({mobileNumber,address})
            await user.save();
        }else{
            user.address=address;
            user.mobileNumber=mobileNumber;
            await user.save();
        }
        const {accessToken,refreshToken}= await generateAccessAndRefreshTokens(user._id)

        return res.status(200).json({user,accessToken,refreshToken})
        
    } catch (error) {
        console.log("Error in login controller :",error)
      return  res.status(500).json({error:error.message})
    }
}

export{login}