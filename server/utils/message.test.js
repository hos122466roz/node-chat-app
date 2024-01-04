const expect=require('expect');
const {generateMessage}=require('./message')

describe("generate Message",()=>{
    it('should generate correct message object',()=>{
        var from ='hosien';
        var text='text  hosein';
        var message=generateMessage(from,text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toEqual(expect.objectContaining({from,text}))

    })
})   