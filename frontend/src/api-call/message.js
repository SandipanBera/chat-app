class Message{
    async getMessage( id ) {    
        try {
            return await (
                await fetch(`http://localhost:8080/api/v1/users/getMessage/${id}`, {
                  method: "GET",
                  credentials: "include",
                  headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                  },
                
                })
              ).json(); 
        } catch (error) {
            console.log(error);
        }
    }
    async sendMessage(id,message) {
        try {
            return await (
                await fetch(`http://localhost:8080/api/v1/users/send/${id}`, {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    },
                  body: JSON.stringify({  message })
                
                })
              ).json(); 
        } catch (error) {
            console.log(error);
        }
        
    }

}
const message = new Message()
export default message