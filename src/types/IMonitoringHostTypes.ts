export interface IMonitoringHostsData {
   id:number;
   jsonrpc:string;
   result:IResultHost[]
  }

  export interface IResultHost {
    hostid: string;
    interfaces: Interface[];
    macros: IMacros[];
    name:string
    parentTemplates:ParentTemplate[];
    status:string
    tags:Tag[]
  }

 export interface Tag {
    tag: string;
    value: string;
  }
  
  export interface IMacros {
    macro: string;
    value: string;
  }
  export interface Interface {
    available: string;
    ip: string;
  }
  
  export interface ParentTemplate {
    name: string;
    templateid: string;
  }
  
