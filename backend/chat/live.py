class LiveObj: 
    def __init__(self, message_type=None, from_user=None, to_user=None, message=None): 
        self.message_type = message_type 
        self.from_user = from_user 
        self.to_user = to_user  
        self.message = message
        
    def data(self): 
        data = {
            'type': self.message_type, 
            'from': self.from_user, 
            'to': self.to_user, 
            'message': self.message
        }  
        return data  
        
    def __str__(self): 
        return str(self.data())