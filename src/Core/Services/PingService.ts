import Payload from "../Contracts/Payload";

class PingService {
  public display(): Payload {
    return { content: 'Pong!' }
  }
}

export default PingService
