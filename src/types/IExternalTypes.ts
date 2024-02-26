export interface IExternalTypes {
    customer_id: number;
    customer_name: string;
    hosts: IExternalHost[];
    credentials: Credential[];
  }
  
  interface Credential {
    created: string
    credential_id: number
    credential_type:number
    passwd: string
    username: string
  }
  
 export interface IExternalHost {
  OperationEnvironment: number
  credential:number
  credential_username: string
  host_id: number
  host_ip: string
  host_name: string
  os: string
  os_id:string
  proxy_ip: string
  tennant: number
  vm_content: string
  vm_type:string
  }
  

  