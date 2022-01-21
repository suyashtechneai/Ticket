import {action,computed,makeAutoObservable,observable,autorun,runInAction} from 'mobx'

class UserStore {
    
    userInfo={
        id:'abc',
        name:'parth',
        subject:['M','E','S']
    }
  
    constructor(){
        makeAutoObservable(this,{
            userInfo:observable,
            totalSubject:computed,
            updateUser:action,
            addSubject:action    
        });
        autorun(this.logUserDetails);
        runInAction(this.prefetchData);
    }

   get totalSubject(){
       return this.userInfo.subject.length
   }
    logUserDetails=()=>{    
        console.log("Usr Subject"+this.totalSubject);
    }

    runInAction=()=>{
        console.log("Prefecth");
    }

    updateUser=(name)=>{
        return "Na"
    }
    addSubject=(data)=>{
        return "Na"
    }

  }
  
  export default UserStore;