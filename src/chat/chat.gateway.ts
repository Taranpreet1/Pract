import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";


@WebSocketGateway(5058, { namespace: 'chat' , cors:true}  )
// @WebSocketGateway()
export class chatGateWay{

@WebSocketServer()
server;

@SubscribeMessage('message')
handleEvent(@MessageBody() data: string): void {
//   return data;
console.log(data);
this.server.emit('message',data)
}

}