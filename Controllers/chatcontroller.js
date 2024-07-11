const chatModel = require("../Models/chatModel")

//createChat
//getuserChat
//findchat

const createChat = async(req, res) => {
    const { firstId, secondId } = req.body
 try{
    const Chat = await chatModel.findOne({
    members: { $all: [firstId, secondId] },
    })
    if (Chat) return res.status(200).json(Chat)
    
    const newChat = new chatModel({
        members: [firstId, secondId]

    })
    const response = await newChat.save()

    res.status(200).json(response)


} catch (error){
    console.log(error);
    res.status(500).json(error);
}
}

const findUserChat = async (req, res) =>{
    const userId = req.params.userId
    
    
    try{
        const chats = await chatModel.find({
            members: { $in: [userId]}
        })
    
    res.status(200).json(chats)

    } catch (error){
        console.log(error);
        res.status(500).json(error);
    }
}

const findChat = async (req, res) =>{

    const { firstId, secondId } = req.params
    
    try{
        const chats = await chatModel.findOne({
            members: { $all: [ firstId, secondId ]},
        })
        console.log(chats);
    
    res.status(200).json(chats)


    } catch (error){
        console.log(error);
        res.status(500).json(error);
    }
}


module.exports = {createChat, findUserChat, findChat};











/*
try{



} catch (error){
    console.log(error);
    res.status(500).json(error);
}

*/