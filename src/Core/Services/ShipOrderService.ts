import Payload from "../Contracts/Payload";

class ShipOrderService {
  public prompt(): Payload {
    return { content: 'This will display a long list of available ships' }
  }
}

export default ShipOrderService
