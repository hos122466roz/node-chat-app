var expect = require('expect')
const {generateMessage,generateLocation}=require('./message')

// describe("generate Message",()=>{
//     it('should generate correct message object',()=>{
//         var from ='hosien';
//         var text='text  hosein';
//         var message=generateMessage(from,text);
//         expect(typeof message.createdAt).toBe('number');
//         expect(message).toEqual(expect.objectContaining({from,text}))

//     })
// })   

describe('generate location..',()=>{
    it('shold genereate coorect location',()=>{
        var from ="hosine";
        var latitude=15;
        var longitude=39;
        var urlL='http://www.google.com/maps?q=39,15';
        var message=generateLocation(from,latitude,longitude);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toEqual(expect.objectContaining({from,urlL}))

    })
})