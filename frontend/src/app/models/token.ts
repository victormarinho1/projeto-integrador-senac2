export interface TokenModel {
  exp: number;          
  id: number;           
  iss: string;        
  nome: string;         
  sobrenome: string;    
  role: 'ADMIN' | 'CONSELHEIRO' | 'DENUNCIANTE' | string; 
  sub: string;         
}
