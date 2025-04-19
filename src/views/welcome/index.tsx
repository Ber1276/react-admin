import { Button } from "antd"
import storage from "../../utils/storage"
import { useParams } from "react-router"
export default function Welcome(){
    const {id}=useParams()
    const handleStorage = (type:number)=>{
       switch(type){
        case 1:
            storage.set("name","张三")
            storage.set("detils",{name:"张三",age:18})
            break;
        case 2:
            console.log(storage.get("name"));
            break;
        case 3:
            storage.remove("name")
            break;
        case 4:
            storage.clear()
            break; 
       }
    }
    return(
        <div>
            <h1>欢迎你,{id}</h1>
            <Button type="primary" onClick={()=>handleStorage(1)}>写入值</Button>
            <Button type="primary" onClick={()=>handleStorage(2)}>读取值</Button>
            <Button type="primary" onClick={()=>handleStorage(3)}>删除值</Button>
            <Button type="primary" onClick={()=>handleStorage(4)}>清除值</Button>
        </div>
    )
}